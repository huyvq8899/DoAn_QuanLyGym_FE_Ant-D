import { FormGroup } from '@angular/forms';

export function GetSelectedArray(array: any) {
  const propertys: any = Object.keys(array);
  let result: any = [];
  for (let i = 0; i < propertys.length; i++) {
    if (array[propertys[i]] === true) {
      result.push(propertys[i]);
    }
  }
  return result;
}
export function ArrayUnique(array: any) {
  var a = array.concat();
  for (var i = 0; i < a.length; ++i) {
    for (var j = i + 1; j < a.length; ++j) {
      if (a[i] === a[j])
        a.splice(j--, 1);
    }
  }
  return a;
}
export function ArraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length != b.length) return false;

  // If you don't care about the order of the elements inside
  // the array, you should sort both arrays here.
  // Please note that calling sort on an array will modify that array.
  // you might want to clone your array first.

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}
export function ConvertDateTime(str: string) {
  var date = new Date(str),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
  return [date.getFullYear(), mnth, day].join("-");
}
export function CheckKyKeToan(ngayChungTu: any) {
  const kyKeToan = JSON.parse(localStorage.getItem('kyKeToan'));
//console.log(new Date(ngayChungTu));
//console.log(new Date(kyKeToan.ngayChungTu));

  if (new Date(ngayChungTu) >= new Date(kyKeToan.denNgay) || new Date(ngayChungTu) <= new Date(kyKeToan.ngayChungTu)) {
    return false;
  }
  else {
    return true;
  }
}
export function GetFileName(str: string) {
  var n = str.lastIndexOf("/");
  var fileName = str.substring(n + 1, str.length);
  return fileName;
}
export function SetPoiterNumber(form: FormGroup, formChiTiet: string, input: any, index: number, name: string, isFocusPoiter: boolean) {
  if (isFocusPoiter) {
    if (form.get(`${formChiTiet}.${index}.${name}`).value === 0) {
      if (input.setSelectionRange) {
        input.focus();
        input.setSelectionRange(1, 1);
      } else if (input.createTextRange) {
        var range = input.createTextRange();
        range.collapse(true);
        range.moveEnd('character', 1);
        range.moveStart('character', 1);
        range.select();
      }
      isFocusPoiter = false;
    } else {
      if (form.get(`${formChiTiet}.${index}.${name}`).value > 0) {
        let xxx: any = input.value;
        const j = xxx.indexOf(",");
        if (input.setSelectionRange) {
          input.focus();
          input.setSelectionRange(j, j);
        } else if (input.createTextRange) {
          var range = input.createTextRange();
          range.collapse(true);
          range.moveEnd('character', j);
          range.moveStart('character', j);
          range.select();
        }
      }
      isFocusPoiter = false;
    }
  }
  else {
    // if (form.get(`${formChiTiet}.${index}.${name}`).value === 0) {
    //   if (input.setSelectionRange) {
    //     input.focus();
    //     input.setSelectionRange(1, 1);
    //   } else if (input.createTextRange) {
    //     var range = input.createTextRange();
    //     range.collapse(true);
    //     range.moveEnd('character', 1);
    //     range.moveStart('character', 1);
    //     range.select();
    //   }
    //   isFocusPoiter = false;
    // } 
  }
  isFocusPoiter = false;
  return isFocusPoiter;
}

export function dynamicSort(prop, reverse) {
  return function (a, b) {
    if (a[prop] < b[prop]) { return reverse ? 1 : -1; }
    if (a[prop] > b[prop]) { return reverse ? -1 : 1; }
    return 0;
  };
}

