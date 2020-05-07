import { FileNode, FileSource } from './fileSource';
import { config } from '../../../util';
import { ColumnRegistrar } from '../../columnRegistrar';

export class FileColumnRegistrar extends ColumnRegistrar<FileNode, FileSource> {
  getColumnConfig<T>(name: string, defaultValue?: T): T {
    return config.get('file.column.' + name, defaultValue)!;
  }
}

export const fileColumnRegistrar = new FileColumnRegistrar();