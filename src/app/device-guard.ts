import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
  })
export class MobileGuard implements CanActivate {

    constructor(
        private router: Router
    ) { }

    canActivate() {
        if (window.innerWidth >= 768) {
            this.router.navigate(['/']);
            return false;
        }
        return true;
    }
}

@Injectable({
    providedIn: 'root'
  })
export class DesktopGuard implements CanActivate {

    constructor(
        private router: Router
    ) { }

    canActivate() {
        if (window.innerWidth < 768) {            
            this.router.navigate(['/m/']);
            return false;
        }
        return true;
    }
}