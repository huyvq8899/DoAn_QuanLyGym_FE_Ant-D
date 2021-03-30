import { AbstractControl, ValidatorFn } from '@angular/forms';

export function CheckExistsValidator(result: boolean): ValidatorFn {
    return (currentControl: AbstractControl): { [key: string]: any } => {
        return result ? { exists: true } : null;
    };
}
