# coc-explorer

**Experimental, maybe has active changes and bugs.**

## Screenshot

![image](https://user-images.githubusercontent.com/1709861/64413599-5e8d5980-d0c4-11e9-936f-863d4672c80f.png)

## Requirements

- `>= vim 8.0` or `>= neovim 0.3.1`

## Usage

1. Install by coc.nvim command:
   ```
   :CocInstall coc-explorer
   ```
2. Configuration custom vim mapping
   ```
   :nmap ge :CocCommand explorer --toggle<CR>
   ```
3. Open explorer
   ```
   ge
   ```
4. Press `?` to show mappings help

## Feature

- [x] Buffer source
  - [x] Highlight visible buffers in real time (neovim only)
- [x] File tree source
  - [x] Basic actions
    - [x] Open file in select / vsplit / tab  
           `explorer.openAction.strategy` options:
      - vsplit: open file with vsplit by default
      - previousBuffer: open file use last used buffer by default
      - select: open file use select ui by default
    - [x] Selection
    - [x] Cut / Copy / Paste
    - [x] Delete action use trash by default
  - [x] Git status
    - [x] Git row format
    - [ ] icon format
  - [x] Highlight current buffer in real time (neovim only)
  - [ ] LSP rename
  - [ ] Exrename, like defx
  - [ ] Support archived file (use `lsar / unar`)
  - [ ] SSH
- [ ] Git source
  - [ ] Git actions
- [x] Show help

## Command

```
:CocCommand explorer
    \ --toggle
    \ --sources="buffer+,file+"
    \ --file-columns="git,selection,clip,indent,filename,size" /path/to
```

### `--sources`

Explorer sources, example: `buffer+,file+`

### `--toggle --no-toggle`

Close the explorer if it exists

### `--width`

Explorer width by default

### `--position`

Explorer position, support positions: `left`, `right`, `tab`

### `--cwd`

Explorer root

### `--buffer-columns`

Explorer buffer columns, supported:

- selection
- name
- bufname
- modified
- bufnr

### `--file-columns`

Explorer file columns, supported:

- git
- selection
- expand-icon
- filename
- indent
- readonly
- clip
- size
