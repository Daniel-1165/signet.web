import * as clerk from "@clerk/nextjs";
console.log('SignedIn:', !!clerk.SignedIn);
console.log('SignedOut:', !!clerk.SignedOut);
console.log('SignInButton:', !!clerk.SignInButton);
console.log('UserButton:', !!clerk.UserButton);
console.log('ClerkProvider:', !!clerk.ClerkProvider);
