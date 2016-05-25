﻿module BABYLON.EDITOR {
    export type _EditionToolConstructor = new (editionTool: EditionTool) => ICustomEditionTool;
    export type _MainToolbarConstructor = new (mainToolbar: MainToolbar) => ICustomToolbarMenu;
    export type _CustomUpdateConstructor = new (core: EditorCore) => ICustomUpdate;

    export class PluginManager {
        // Plugins
        public static EditionToolPlugins: _EditionToolConstructor[] = [];
        public static MainToolbarPlugins: _MainToolbarConstructor[] = [];
        public static CustomUpdatePlugins: _CustomUpdateConstructor[] = [];

        // Functions
        public static RegisterEditionTool(tool: _EditionToolConstructor): void {
            this.EditionToolPlugins.push(tool);
        }

        public static RegisterMainToolbarPlugin(plugin: _MainToolbarConstructor): void {
            this.MainToolbarPlugins.push(plugin);
        }

        public static RegisterCustomUpdatePlugin(plugin: _CustomUpdateConstructor): void {
            this.CustomUpdatePlugins.push(plugin);
        }
    }
}
