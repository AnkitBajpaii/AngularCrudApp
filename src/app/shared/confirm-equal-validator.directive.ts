import { Validator, NG_VALIDATORS, AbstractControl, ValidationErrors } from '@angular/forms';
import { Directive, Input } from '@angular/core';

@Directive({
    selector: '[appConfirmEqualValidator]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: ConfirmEqualValidatorDirective,
        multi: true
    }]

})
export class ConfirmEqualValidatorDirective implements Validator {

    // name of controlToCompare i.e name of the field that we want to compare controlToValidate control with
    @Input()
    appConfirmEqualValidator: string;

    // control : controlToValidate
    validate(control: AbstractControl): ValidationErrors | null {
        const controlToCompare = control.parent.get(this.appConfirmEqualValidator);

        if (controlToCompare && controlToCompare.value !== control.value) {
            return { 'notEqual': true };
        }

        return null;
    }
}
