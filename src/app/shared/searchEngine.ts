export function SearchEngine(array: any, arrayCondition: any = null, keyword: string) {
    keyword = keyword.toUpperCase().trim();
    const keywordUnSign = toUnSign(keyword);
    const propertys: any = Object.keys(array[0]);
    // console.log(propertys);
    // console.log(array[0][propertys[0]]);
    const result: any[] = [];
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < array.length; i++) {
        // tslint:disable-next-line: prefer-for-of
        for (let j = 0; j < arrayCondition.length; j++) {
            const data = (array[i][arrayCondition[j]]) + '' || '';
            // console.log(data);
            // console.log((array[i][arrayCondition[j]]));
            // tslint:disable-next-line: no-unused-expression
            // tslint:disable-next-line: align
            const dataFilter = data.toUpperCase().includes(keyword) ||
                toUnSign(data.toUpperCase()).includes(toUnSign(keywordUnSign));
            if (dataFilter) {
                result.push(array[i]);
                // console.log(array[i]);
                break;
            }
        }
    }
    // console.log(result);
    return result;
}
export function toUnSign(input: string) {
    if (input === undefined || input === '') {
        return '';
    }
    input = input.replace(/đ/gi, 'd');
    return input.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

