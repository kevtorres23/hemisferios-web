"use client"

import { Checkbox } from "@/components/ui/checkbox"
import {
    Field,
    FieldGroup,
} from "@/components/ui/field";
import { Label } from "@/components/ui/label";

type CheckboxProps = {
    checked: boolean;
    onCheckedChange: () => void;
    item: React.ReactNode;
}

function OptionCheckbox(props: CheckboxProps) {
    return (
        <FieldGroup className="max-w-sm">
            <Field orientation="horizontal">
                <Checkbox checked={props.checked} onCheckedChange={props.onCheckedChange} id="terms-checkbox" name="terms-checkbox" />
                <Label htmlFor="terms-checkbox">{props.item}</Label>
            </Field>
        </FieldGroup>
    );
};

export default OptionCheckbox;