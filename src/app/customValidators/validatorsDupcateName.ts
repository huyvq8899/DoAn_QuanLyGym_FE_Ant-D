import { AsyncValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { toUnSign } from '../shared/searchEngine';
import { RoleService } from '../services/role.service';
import { KhachHangService } from 'src/app/services/khach-hang.service';
import { ProductService } from '../services/product.service';
import { CardService } from '../services/card.service';
export function ValidatorsDupcateName(userService: UserService): AsyncValidatorFn {
    return (control: AbstractControl):
        Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
        return userService.checkUserName(control.value).pipe(
            map(res => {
                // tslint:disable-next-line: object-literal-key-quotes
                return (res === true) ? { 'checkUserName': true } : null;
            })
        );
    };
}
export function ValidatorsDupcateUserName(userService: UserService, currentUserName: string): AsyncValidatorFn {
  return (c: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      return userService.checkUserName(c.value).pipe(
          map(res => {
            if (c.value.toLowerCase().trim() === currentUserName.toLowerCase().trim()) {
              return null;
            }
            // tslint:disable-next-line: object-literal-key-quotes
            return res ? { 'checkUserName': true } : null;
          })
        );
  };
}
export function ValidatorsDupcateProductCode(
    productService: ProductService,
    currentMa: string
  ): AsyncValidatorFn {
    return (
      c: AbstractControl
    ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      return productService.CheckTrungMa(c.value).pipe(
        map((res) => {
          if (c.value.toLowerCase().trim() === currentMa.toLowerCase().trim()) {
            return null;
          }
          // tslint:disable-next-line: object-literal-key-quotes
          return res ? { checkMa: true } : null;
        })
      );
    };
  }
  export function ValidatorsDupcateMaKhachHang(
    KhachHangService: KhachHangService,
    currentMa: string
  ): AsyncValidatorFn {
    return (
      c: AbstractControl
    ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      return KhachHangService.CheckTrungMa(c.value).pipe(
        map((res) => {
          if (c.value.toLowerCase().trim() === currentMa.toLowerCase().trim()) {
            return null;
          }
          // tslint:disable-next-line: object-literal-key-quotes
          return res ? { checkMa: true } : null;
        })
      );
    };
  }
  export function ValidatorsDupcateCardCode(
    cardService: CardService,
    currentMa: string
  ): AsyncValidatorFn {
    return (
      c: AbstractControl
    ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      return cardService.CheckTrungMa(c.value).pipe(
        map((res) => {
          if (c.value.toLowerCase().trim() === currentMa.toLowerCase().trim()) {
            return null;
          }
          // tslint:disable-next-line: object-literal-key-quotes
          return res ? { checkMa: true } : null;
        })
      );
    };
  }
  
export function ValidatorsDupcateRoleName(rolesv: RoleService, currentRoleName: string): AsyncValidatorFn {
    return (c: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
        return rolesv.checkRoleName(c.value).pipe(
            map(res => {
              if (c.value.toLowerCase().trim() === currentRoleName.toLowerCase().trim()) {
                return null;
              }
              // tslint:disable-next-line: object-literal-key-quotes
              return res ? { 'checkRoleName': true } : null;
            })
          );
    };
}