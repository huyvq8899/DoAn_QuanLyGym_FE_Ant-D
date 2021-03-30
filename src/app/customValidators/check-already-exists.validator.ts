import { AbstractControl, ValidatorFn } from '@angular/forms';

export function CheckAlreadyExistsValidator(result: boolean): ValidatorFn {
    return (currentControl: AbstractControl): { [key: string]: any } => {
        return result === true ? { exists: true } : null;
    };
}
