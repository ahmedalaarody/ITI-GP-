# PowerShell Execution Policy Fix Guide

## Problem Solved ✅

The main issue was that PowerShell's execution policy was blocking npm scripts from running.

### Error Message:
```
File D:\iti\Node JS\npm.ps1 cannot be loaded because running scripts is disabled on this system.
```

## Solution Applied

### 1. Fixed PowerShell Execution Policy
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

This allows signed scripts to run in the current user context.

### 2. Verified npm is Working
```powershell
npm --version
```
✅ Output: 10.9.2

### 3. Started Both Servers

#### JSON Server (Backend) - Port 5000
```powershell
npm run server
```

#### React Development Server (Frontend) - Port 5173
```powershell
npm run dev
```

## How to Test Your Application

### Step 1: Verify JSON Server is Running
Visit: http://localhost:5000/products
You should see your products JSON data.

### Step 2: Verify React App is Running
Visit: http://localhost:5173
You should see the login page.

### Step 3: Test Login
**Credentials:**
- Email: `ahmed@gmail.com`
- Password: `ahmed123`

### Step 4: Test Products
- Should see 3 products: Chair, Table, Desk Lamp
- Should be able to add, edit, and delete products

## API Endpoints Now Available

### Products
- `GET http://localhost:5000/products` - Get all products
- `POST http://localhost:5000/products` - Add new product
- `PUT http://localhost:5000/products/:id` - Update product
- `DELETE http://localhost:5000/products/:id` - Delete product

### Users (Authentication)
- `GET http://localhost:5000/users?email=...&password=...` - Login

### Profile
- `GET http://localhost:5000/profile` - Get user profile

## Troubleshooting

### If you still get execution policy errors:
1. Open PowerShell as Administrator
2. Run: `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope LocalMachine`
3. Type "Y" to confirm

### If servers don't start:
1. Check if ports 5000 and 5173 are available
2. Close any other applications using these ports
3. Try different ports if needed

### If login still fails:
1. Verify JSON Server is running on port 5000
2. Check browser console for network errors
3. Verify credentials in db.json match exactly

## Expected Behavior Now

✅ **Login**: Should work with correct credentials
✅ **Products**: Should display all 3 products from db.json
✅ **Add Product**: Should work and show in list immediately
✅ **Edit Product**: Should work and redirect properly
✅ **Delete Product**: Should work and remove from list
✅ **Toast Notifications**: Should appear for all actions

## Verification Checklist

- [ ] PowerShell execution policy fixed
- [ ] JSON Server running on port 5000
- [ ] React app running on port 5173
- [ ] Can access http://localhost:5000/products
- [ ] Can access http://localhost:5173
- [ ] Login works with ahmed@gmail.com / ahmed123
- [ ] Products display correctly
- [ ] Add/Edit/Delete operations work
- [ ] Toast notifications appear

## Next Steps

1. **Test all functionality** as described above
2. **Check browser console** for any remaining errors
3. **Verify network requests** in browser DevTools
4. **Report any issues** with specific error messages

Your application should now work perfectly! 🎉 