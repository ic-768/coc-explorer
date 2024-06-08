import type {
  CancellationToken,
  CodeActionContext,
  CodeActionProvider,
  Command,
  Range,
  TextDocument,
} from 'coc.nvim';
import type { ExplorerManager } from '../explorerManager';
import { actionListMru } from '../lists/actions';
import { keyMapping } from '../mappings';
import { ActionMenu } from './menu';

function score(list: string[], key: string): number {
  const idx = list.indexOf(key);
  return idx === -1 ? -1 : list.length - idx;
}

export class ActionMenuCodeActionProvider implements CodeActionProvider {
  constructor(public explorerManager: ExplorerManager) {}

  async provideCodeActions(
    _document: TextDocument,
    _range: Range,
    _context: CodeActionContext,
    _token: CancellationToken,
  ): Promise<Command[]> {
    const explorer = await this.explorerManager.currentExplorer();
    if (!explorer) {
      return [];
    }
    const source = await explorer.view.currentSource();
    if (!source) {
      return [];
    }

    const reverseMappings = await keyMapping.getReversedMappings(
      source.sourceType,
    );
    const actions = source.action.registeredActions();
    const mruList = await actionListMru.load();

    return [...actions.entries()]
      .filter(([actionName]) => actionName !== 'actionMenu')
      .sort(([aName], [bName]) => aName.localeCompare(bName))
      .sort(([aName], [bName]) => aName.localeCompare(bName))
      .map(([actionName, { options }]) => {
        const keys = reverseMappings.get(actionName);
        const key = keys ? keys.vmap ?? keys.nmap : '';
        const list = [
          {
            title: `${actionName} [${key}]`,
            name: actionName,
            command: 'explorer.doCodeAction',
            arguments: [actionName, actionName, async () => []] as [
              string,
              string,
              () => Promise<string[]>,
            ],
            score: score(mruList, actionName),
          },
        ];
        if (options.menus) {
          list.push(
            ...ActionMenu.getNormalizeMenus(options.menus).map((menu) => {
              const fullActionName = `${actionName}:${menu.args}`;
              const keys = reverseMappings.get(fullActionName);
              const key = keys ? keys.vmap ?? keys.nmap : '';
              return {
                title: `${fullActionName} [${key}]`,
                name: fullActionName,
                command: 'explorer.doCodeAction',
                arguments: [
                  fullActionName,
                  actionName,
                  () => menu.actionArgs(),
                ] as [string, string, () => Promise<string[]>],
                score: score(mruList, fullActionName),
              };
            }),
          );
        }
        return list;
      })
      .flat()
      .sort((a, b) => b.score - a.score);
  }
}
