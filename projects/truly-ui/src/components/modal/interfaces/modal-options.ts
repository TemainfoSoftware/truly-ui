import 'reflect-metadata';

export interface ModalOptions {
    icon?: string;
    title: string;
    color?: string;
    height?: string;
    width?: string;
    closeShortcut?: string;
    restoreShortcut?: string;
    maximizeShortcut?: string;
    draggable?: boolean;
    maximizable?: boolean;
    minimizable?: boolean;
    closable?: boolean;
    fullscreen?: boolean;
    restoreMaximize?: boolean;
    backdrop?: boolean;
    closeOnOK?: boolean;
    unique?: boolean;
}

export function Modal(metadata: ModalOptions) {
  return function(cls: any) {
    const annotations = Reflect.getMetadata('annotations', cls) || [];
    annotations.push(metadata);
    Reflect.defineMetadata('annotations', annotations, cls);
    return cls;
  };
}
