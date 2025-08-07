# Troubleshooting Guide - Backend Connection Issues

## Issues Fixed

### 1. JSON Server Not Running
**Problem**: The main issue was that JSON Server wasn't installed or running.

**Solution**: 
- ✅ Installed `json-server` as a dev dependency
- ✅ Added `"server": "json-server --watch db.json --port 5000"` script to package.json
- ✅ Started JSON Server on port 5000

### 2. Password Mismatch
**Problem**: Login was failing because the password in db.json didn't match what the login form expected.

**Solution**:
- ✅ Updated password in db.json from "123456" to "ahmed123"
- ✅ Now matches the expected credentials in LoginForm.jsx

### 3. API Endpoints Configuration
**Problem**: All API endpoints were correctly configured to use `http://localhost:5000`.

**Solution**:
- ✅ Verified all API files use correct BASE_URL
- ✅ Products API: `http://localhost:5000/products`
- ✅ Auth API: `http://localhost:5000/users`
- ✅ Profile API: `http://localhost:5000/profile`

## How to Start the Application

### Step 1: Start JSON Server (Backend)
```bash
npm run server
```
This will start JSON Server on http://localhost:5000

### Step 2: Start React Development Server (Frontend)
```bash
npm run dev
```
This will start the React app on http://localhost:5173

### Step 3: Test the Application

#### Login Credentials:
- **Email**: `ahmed@gmail.com`
- **Password**: `ahmed123`

#### Test Scenarios:

1. **Login Test**:
   - Go to http://localhost:5173/login
   - Enter the credentials above
   - Should see success toast and redirect to products page

2. **Products List Test**:
   - Should see 3 products: Chair, Table, and Desk Lamp
   - Images should display properly
   - No "No products found" message

3. **Add Product Test**:
   - Click "Add New Product"
   - Fill out the form
   - Submit
   - Should see success toast and redirect to products page
   - New product should appear in the list

4. **Edit Product Test**:
   - Click edit on any product
   - Make changes
   - Submit
   - Should see success toast and redirect to products page

5. **Delete Product Test**:
   - Click delete on any product
   - Confirm deletion
   - Should see success toast and product removed from list

## API Endpoints Available

With JSON Server running, these endpoints are available:

### Products
- `GET http://localhost:5000/products` - Get all products
- `GET http://localhost:5000/products/:id` - Get product by ID
- `POST http://localhost:5000/products` - Create new product
- `PUT http://localhost:5000/products/:id` - Update product
- `DELETE http://localhost:5000/products/:id` - Delete product

### Users (Authentication)
- `GET http://localhost:5000/users?email=...&password=...` - Login user

### Profile
- `GET http://localhost:5000/profile` - Get user profile

## Troubleshooting Common Issues

### Issue: "No products found" message
**Cause**: JSON Server not running
**Solution**: Run `npm run server` in a separate terminal

### Issue: Login fails with correct credentials
**Cause**: Password mismatch or JSON Server not running
**Solution**: 
1. Ensure JSON Server is running
2. Verify password in db.json matches "ahmed123"

### Issue: Add product doesn't work
**Cause**: JSON Server not running or network error
**Solution**: 
1. Check if JSON Server is running on port 5000
2. Check browser console for network errors
3. Verify the product data format

### Issue: Images not loading
**Cause**: CORS issues or invalid image URLs
**Solution**: 
1. JSON Server handles CORS automatically
2. Check if image URLs are valid
3. Fallback images are provided for missing images

## Verification Steps

### 1. Check JSON Server is Running
Visit http://localhost:5000/products in your browser. You should see the JSON data.

### 2. Check React App is Running
Visit http://localhost:5173 in your browser. You should see the login page.

### 3. Check Network Tab
Open browser DevTools → Network tab to see API calls:
- Should see calls to localhost:5000
- Should see 200 status codes for successful requests

### 4. Check Console for Errors
Open browser DevTools → Console tab:
- Should not see CORS errors
- Should not see network errors
- May see successful API response logs

## Data Structure

### Current Products in db.json:
1. **Chair** - $150 - Furniture
2. **Table** - $250 - Furniture  
3. **Desk Lamp** - $60 - Furniture

### Current User in db.json:
- **Email**: ahmed@gmail.com
- **Password**: ahmed123
- **Name**: Ahmed Alaa

### Profile Data:
- **Name**: ahmed alaa
- **Email**: ahmed@gmail.com
- **Phone**: +20 1113158812
- **Address**: 123 Main Street, City, Country
- **Birthday**: January 7, 2004

## Next Steps

After following this guide:
1. ✅ All backend connection issues should be resolved
2. ✅ Login should work with correct credentials
3. ✅ Products should display properly
4. ✅ Add/Edit/Delete operations should work
5. ✅ Toast notifications should appear
6. ✅ Navigation should work correctly

If you still experience issues, check:
1. Both servers are running (JSON Server + React Dev Server)
2. No firewall blocking port 5000
3. Browser console for specific error messages
4. Network tab for failed API requests 