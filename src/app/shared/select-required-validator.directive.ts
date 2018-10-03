import { Validator, ValidationErrors, AbstractControl, NG_VALIDATORS } from '@angular/forms';
import { Directive, Input } from '@angular/core';

@Directive({
    selector: '[appSelectValidator]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: SelectRequiredValidatorDirective,
        multi: true
    }]
})
export class SelectRequiredValidatorDirective implements Validator {

    // tslint:disable-next-line:no-input-rename
    @Input('appSelectValidator')
    defaultValue: string;

    validate(control: AbstractControl): ValidationErrors | null {
        if (control && control.value === this.defaultValue) {
            return { 'defaultSelected': true };
        }

        return null;
    }
}
