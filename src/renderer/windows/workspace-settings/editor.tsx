import * as React from "react";
import { Callout, Intent, FormGroup, InputGroup, Button } from "@blueprintjs/core";

import WorkspaceSettingsWindow from "./index";

export interface IEditorSettingsProps {
    /**
     * Defines the reference to the settings window.
     */
    settings: WorkspaceSettingsWindow;
}

export interface IEditorSettingsState {
    
}

export class EditorSettings extends React.Component<IEditorSettingsProps, IEditorSettingsState> {
    /**
     * Renders the component.
     */
    public render(): React.ReactNode {
        const positionGizmoSnapping = this.props.settings.state.positionGizmoSnapping ?? [0, 1, 2, 5, 10];

        return (
            <div key="snapping-main-div">
                <Callout key="position-snapping-callout" intent={Intent.NONE} title="Gizmo Snapping Values">
                    <FormGroup key="position-snapping-form" label="Gizmo Snapping Values">
                        {positionGizmoSnapping.map((p, index) => (
                            <>
                                <InputGroup key={`position-snapping-${index}`} type="number" style={{ float: "left", width: "calc(100% - 30px)" }} min={0} value={p.toString()} step={0.1} onChange={(e) => {
                                    positionGizmoSnapping[index] = parseFloat(e.currentTarget.value);
                                    this.setState({ positionGizmoSnapping });
                                }} />
                                <Button key={`remove-snapping-${index}`} text="" icon="remove" style={{ float: "left" }} onClick={() => this._handleRemoveStep(positionGizmoSnapping, index)} />
                            </>
                        ))}
                        <Button key="add-position-snapping" text="Add..." icon="add" fill={true} onClick={() => this._handleAddPositionSnapping(positionGizmoSnapping)} />
                    </FormGroup>
                </Callout>
            </div>
        );
    }

    /**
     * Called on the user wants to add a new position gizmo snapping value.
     */
    private _handleAddPositionSnapping(existingValues: number[]): void {
        const values = existingValues.slice();

        const sorted = values.sort((a, b) => a - b);
        sorted.push(sorted[sorted.length - 1] + 1);

        this.props.settings.setState({ positionGizmoSnapping: sorted });
    }

    /**
     * Called on the user wants to remove a step.
     */
    private _handleRemoveStep(existingValues: number[], index: number): void {
        const values = existingValues.slice();
        if (values.length === 1) { return; }

        values.splice(index, 1);

        this.props.settings.setState({ positionGizmoSnapping: values });
    }
}