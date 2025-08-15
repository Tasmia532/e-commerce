import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  User,
  onAuthStateChanged,
  linkWithCredential,
  EmailAuthProvider
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import {
  Firestore,
  doc,
  serverTimestamp,
  setDoc,
  getDoc
} from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // Observables for authentication state
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticated.asObservable();

  private isAdminSubject = new BehaviorSubject<boolean>(false);
  isAdmin$ = this.isAdminSubject.asObservable();

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();
  user$: any;

  constructor(
    private auth: Auth,
    private router: Router,
    private firestore: Firestore
  ) {
    // This keeps user logged in after refresh
    onAuthStateChanged(this.auth, async (user) => {
      this.isAuthenticated.next(!!user);
      this.currentUserSubject.next(user);

      if (user) {
        try {
          const userDoc = await getDoc(doc(this.firestore, `users/${user.uid}`));
          const isAdmin = userDoc.exists() && userDoc.data()?.['isAdmin'] === true;
          this.isAdminSubject.next(isAdmin);
        } catch (error) {
          console.error('Error checking admin/user status:', error);
          this.isAdminSubject.next(false);
        }
      } else {
        this.isAdminSubject.next(false);
      }
    });
  }

  // Email & password login
  async loginWithEmail(email: string, password: string) {
    try {
      const cred = await signInWithEmailAndPassword(this.auth, email, password);

      const userDoc = await getDoc(doc(this.firestore, `users/${cred.user?.uid}`));
      const isAdmin = userDoc.exists() && userDoc.data()?.['isAdmin'] === true;

      this.isAdminSubject.next(isAdmin);

      // Navigate to correct dashboard
      if (isAdmin) this.router.navigate(['/admin/dashboard']);
      else this.router.navigate(['/user/dashboard']);
    } catch (error: any) {
      console.error('Login failed:', error.code, error.message);
      alert(`Error: ${error.code}`);
      throw error;
    }
  }

  // Google login
  async loginWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(this.auth, provider);
      const user = result.user;

      // Store or update user in Firestore
      const userRef = doc(this.firestore, `users/${user.uid}`);
      await setDoc(
        userRef,
        {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          isAdmin: user.email === 'admin@gmail.com', // Set your admin email here
          createdAt: serverTimestamp()
        },
        { merge: true }
      );

      const userDoc = await getDoc(userRef);
      const isAdmin = userDoc.exists() && userDoc.data()?.['isAdmin'] === true;
      this.isAdminSubject.next(isAdmin);

      // Navigate to correct dashboard
      if (isAdmin) this.router.navigate(['/admin/dashboard']);
      else this.router.navigate(['/user/dashboard']);
    } catch (error) {
      console.error('Google login failed:', error);
      throw error;
    }
  }

  // Get current user object
  get currentUser() {
    return this.auth.currentUser;
  }

  // Simple check for logged-in state
  isLoggedIn(): boolean {
    return !!this.auth.currentUser;
  }

  // Logout
  async logout(): Promise<void> {
    try {
      await signOut(this.auth);
      this.isAdminSubject.next(false);
      this.router.navigate(['/login']); // back to login
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }

  // Link email/password to existing Google account
  async linkEmailPassword(email: string, password: string) {
    if (!this.auth.currentUser) {
      throw new Error('No user is currently logged in.');
    }
    const credential = EmailAuthProvider.credential(email, password);
    return await linkWithCredential(this.auth.currentUser, credential);
  }
}
