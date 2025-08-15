import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp({
      apiKey: "AIzaSyD_fEnKArRw4ibfvXnTP8UAGKPqXXxlWyg",
      authDomain: "commerce-784d2.firebaseapp.com",
      projectId: "commerce-784d2",
      storageBucket: "commerce-784d2.firebasestorage.app",
      messagingSenderId: "221115961136",
      appId: "1:221115961136:web:94034f7e7cb50d571482f5",
      measurementId: "G-N42746CNEJ"
    })),
    provideAuth(() => getAuth())
  ]
};
