type ICnsOpts = Record<string, any>;

export function classnames(names: string[]): string;
export function classnames(opts: ICnsOpts): string;
export function classnames(arg: ICnsOpts | string[]) {
  if (Array.isArray(arg)) {
    return arg.join(' ');
  }
  return Object.keys(arg).filter(key => {
    return Boolean(arg[key]);
  }).join(' ');
}

export const cns = classnames;
