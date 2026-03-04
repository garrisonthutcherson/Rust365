# Custom Domain Setup for Rust365

To point your custom domain (e.g., `www.rust365.com`) to this project, follow these steps in the Firebase Console:

## 1. Access App Hosting Settings
1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Select your project: **studio-8156739726-d4da5**.
3. In the left-hand menu, navigate to **App Hosting**.
4. Click on your active backend (the one linked to your GitHub repository).

## 2. Add Your Domain
1. Click on the **Settings** tab.
2. Look for the **Custom Domains** section.
3. Click the **Add Domain** button.
4. Enter your domain name (e.g., `rust365.com`).

## 3. Verify Ownership & Update DNS
Firebase will provide you with DNS records (typically `A` or `CNAME` records). You must add these to your domain registrar's DNS management panel (e.g., Namecheap, GoDaddy, Google Domains):

- **Record Type**: A or CNAME (as specified by Firebase)
- **Host**: `@` or `www`
- **Value**: The IP address or alias provided by the console.

## 4. Wait for Propagation
DNS changes can take anywhere from a few minutes to 24 hours to propagate globally. Once verified, Firebase will automatically provision an SSL certificate for your domain.

---
*Note: Since this project uses Firebase App Hosting, ensure you are using the App Hosting section of the console rather than the traditional 'Hosting' section.*
