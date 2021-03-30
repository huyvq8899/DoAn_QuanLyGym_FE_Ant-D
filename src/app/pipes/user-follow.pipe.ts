import { Pipe, PipeTransform } from '@angular/core';
import { UserFollow } from '../models/UserFollow';

@Pipe({
    name: 'userfollow'
})
export class UserFollowPipe implements PipeTransform {
    constructor(
    ) {
    }

    transform(userList: any): any {
        if (userList != null && userList.length > 0) {
            let listString: string[] = [];
            userList.forEach(element => {
                //const a: UserFollow = { userId: element.userId, userName: element.userName, fullName: element.fullName };
                listString.push(element.userName);
            });
            return listString.join(',');
        }
        return "Chưa có";
    }
}
