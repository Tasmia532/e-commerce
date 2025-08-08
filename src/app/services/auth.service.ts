import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  UserCredential,
  onAuthStateChanged,
  EmailAuthProvider,
  linkWithCredential,
  linkWithPopup
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticated.asObservable();

  private isAdminSubject = new BehaviorSubject<boolean>(false);
  isAdmin$ = this.isAdminSubject.asObservable();

  constructor(private auth: Auth, private router: Router) {
    onAuthStateChanged(this.auth, async (user) => {
      this.isAuthenticated.next(!!user);

      if (user) {
        try {
          const idTokenResult = await user.getIdTokenResult();
          const isAdmin = idTokenResult.claims?.['admin'] === true;
          this.isAdminSubject.next(isAdmin);
        } catch (error) {
          console.error('Error checking admin claims:', error);
          this.isAdminSubject.next(false);
        }
      } else {
        this.isAdminSubject.next(false);
      }
    });
  }

  loginWithEmail(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  async loginWithGoogle(): Promise<UserCredential> {
    const provider = new GoogleAuthProvider();
    return await signInWithPopup(this.auth, provider);
  }

  async linkGoogleAccount(): Promise<void> {
    const user = this.auth.currentUser;
    const provider = new GoogleAuthProvider();

    if (!user) return;

    try {
      await linkWithPopup(user, provider);
      console.log('✅ Google account linked successfully');
    } catch (error: any) {
      if (error.code === 'auth/credential-already-in-use') {
        console.warn('⚠️ Google account is already linked to another user.');
      } else if (error.code === 'auth/requires-recent-login') {
        console.warn('🔒 Please log in again to link Google.');
      } else {
        console.error('❌ Google linking failed:', error);
      }
    }
  }

  async linkEmailPassword(email: string, password: string): Promise<void> {
    const user = this.auth.currentUser;
    const credential = EmailAuthProvider.credential(email, password);

    if (!user) return;

    try {
      await linkWithCredential(user, credential);
      console.log('✅ Email/password linked to Google account');
    } catch (error: any) {
      if (error.code === 'auth/credential-already-in-use') {
        console.warn('⚠️ This email is already used by another account.');
      } else if (error.code === 'auth/email-already-in-use') {
        console.warn('⚠️ Email already in use with another account.');
      } else {
        console.error('❌ Linking failed:', error);
      }
    }
  }

  logout(): Promise<void> {
    return signOut(this.auth).then(() => {
      this.router.navigate(['/login']);
    });
  }

  get currentUser() {
    return this.auth.currentUser;
  }

  isLoggedIn(): boolean {
    return !!this.auth.currentUser;
  }
}
