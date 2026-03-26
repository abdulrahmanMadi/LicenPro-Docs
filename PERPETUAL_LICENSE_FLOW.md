# Perpetual License Complete Flow Documentation

**Version:** 1.0  
**Last Updated:** March 17, 2026  
**Purpose:** Comprehensive guide on how perpetual licenses flow from dashboard creation to user machine validation

---

## Table of Contents

1. [Overview](#overview)
2. [Complete Flow Diagram](#complete-flow-diagram)
3. [Dashboard: License Creation](#dashboard-license-creation)
4. [Dashboard: File Generation](#dashboard-file-generation)
5. [User Machine: SDK Integration](#user-machine-sdk-integration)
6. [Validation Process](#validation-process)
7. [Session Management](#session-management)
8. [Feature Management](#feature-management)
9. [Troubleshooting](#troubleshooting)

---

## Overview

A perpetual license in LicenPro is a one-time purchase license that never expires (unless explicitly set). It links three key components:

1. **Dashboard** - Where licenses are created and managed
2. **SDK** - Embedded in your application for validation
3. **User Machine** - Where the license is validated and used

The flow ensures secure, tamper-proof licensing using RSA cryptography while supporting both offline and online validation modes.

---

## Complete Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    LicenPro Dashboard                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Products   │  │   Releases   │  │   Licenses   │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Sessions   │  │  Activations │  │   Features   │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
                            ↓
                    Generate License
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                    License Package                          │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ license.bin (Encrypted, RSA Signed)                  │  │
│  │ - License Type: Perpetual                            │  │
│  │ - Issued To: user@example.com                        │  │
│  │ - License Key: LP-A1B2-C3D4-E5F6                     │  │
│  │ - Product: PhotoEditor Pro v1.0.0                    │  │
│  │ - Features: Pages Edit, Export PDF                   │  │
│  │ - Expiration: 2027-12-31 (or null for perpetual)    │  │
│  │ - Signature: RSA-SHA256                              │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ LicenseKey.txt                                       │  │
│  │ LP-A1B2-C3D4-E5F6                                    │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ PublicKey.pem (RSA Public Key)                       │  │
│  │ -----BEGIN PUBLIC KEY-----                           │  │
│  │ MIIBCgKCAQEA...                                      │  │
│  │ -----END PUBLIC KEY-----                             │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            ↓
                    Deliver to User
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                    User Machine                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Your Application + LicenPro SDK                      │  │
│  └──────────────────────────────────────────────────────┘  │
│                            ↓                                │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Step 1: Load license.bin                             │  │
│  │ Step 2: Verify RSA signature with PublicKey.pem      │  │
│  │ Step 3: Validate LicenseKey matches                  │  │
│  │ Step 4: Check expiration date (if set)               │  │
│  │ Step 5: Load assigned features                       │  │
│  └──────────────────────────────────────────────────────┘  │
│                            ↓                                │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Offline Mode: ✓ License Valid                        │  │
│  │ - No internet required                               │  │
│  │ - Local cryptographic verification                   │  │
│  │ - Features enabled based on license                  │  │
│  └──────────────────────────────────────────────────────┘  │
│                            OR                               │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Online Mode: ✓ License Valid + Session Connected     │  │
│  │ - Connect to dashboard API                           │  │
│  │ - Establish session with JWT token                   │  │
│  │ - Send heartbeat every 5 minutes                     │  │
│  │ - Track usage analytics                              │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            ↓
                    (If Online Mode)
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                    Dashboard Monitoring                     │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Active Sessions View                                 │  │
│  │ - User: user@example.com                             │  │
│  │ - Device: DESKTOP-ABC123                             │  │
│  │ - IP: 192.168.1.100                                  │  │
│  │ - OS: Windows 11                                     │  │
│  │ - Status: Online                                     │  │
│  │ - Last Heartbeat: 2 minutes ago                      │  │
│  │ - Connected: 1 hour 23 minutes                       │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Actions Available                                    │  │
│  │ - Force Disconnect Session                           │  │
│  │ - Revoke License                                     │  │
│  │ - View Usage Analytics                               │  │
│  │ - Track Feature Usage                                │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## Dashboard: License Creation

### Step 1: Navigate to License Creation

1. Log in to the LicenPro Dashboard
2. Navigate to **Licenses → Create License**
3. Select **Perpetual** as the license type

### Step 2: Configure License Details

```json
{
  "name": "Enterprise License",
  "type": "Perpetual",
  "issuedTo": "user@example.com",
  "productId": "guid-of-product",
  "releaseId": "guid-of-release",
  "expirationDate": null,  // null = never expires
  "features": ["Pages Edit", "Export PDF"],
  "notes": "Enterprise tier license"
}
```

### Step 3: Key Fields Explained

| Field | Description | Example | Required |
|-------|-------------|---------|----------|
| **Name** | Human-readable license name | "Enterprise License" | Yes |
| **Type** | License type | "Perpetual" | Yes |
| **IssuedTo** | End user email (used for validation) | "user@example.com" | Yes |
| **Product** | Product this license is for | "PhotoEditor Pro" | Yes |
| **Release** | Specific product version | "v1.0.0" | Yes |
| **ExpirationDate** | Optional expiration | null or "2027-12-31" | No |
| **Features** | Assigned features | ["Pages Edit"] | No |
| **Activation Mode** | Offline or Online | "Offline" | Yes |

### Step 4: Activation Mode

**Offline Mode (Default):**
- No internet required
- Local cryptographic validation only
- No session tracking in dashboard
- Best for air-gapped environments

**Online Mode:**
- Requires internet connection
- Session tracking enabled
- Heartbeat monitoring (every 5 minutes)
- Real-time usage analytics
- Remote revocation support

---

## Dashboard: File Generation

When you create a license, the dashboard generates three files:

### 1. license.bin (Binary License File)

**Contents:**
```
- License Type: Perpetual
- Issued To: user@example.com
- License Key: LP-A1B2-C3D4-E5F6
- Product ID: guid
- Release ID: guid
- Product Name: PhotoEditor Pro
- Version: 1.0.0
- Expiration Date: null (or specific date)
- Features: { "Pages Edit": true, "Export PDF": true }
- Signature: RSA-SHA256 digital signature
- Checksum: SHA-256 hash
```

**Security:**
- Encrypted using AES-256
- Signed with RSA private key (2048-bit or higher)
- Tamper-proof (any modification invalidates signature)
- Cannot be reverse-engineered without private key

### 2. LicenseKey.txt (Plain Text Key)

```
LP-A1B2-C3D4-E5F6
```

This is the license key that must be provided during SDK validation.

### 3. PublicKey.pem (RSA Public Key)

```
-----BEGIN PUBLIC KEY-----
MIIBCgKCAQEA7Z3QX9...
-----END PUBLIC KEY-----
```

This public key is used by the SDK to verify the license signature.

### File Delivery

The three files are packaged into a ZIP file and can be:
- Downloaded directly from the dashboard
- Automatically emailed to the end user
- Shared via secure download link

---

## User Machine: SDK Integration

### Step 1: Install LicenPro SDK

```bash
dotnet add package LicenPro.SDK --version 1.2.4
```

### Step 2: Basic Offline Validation

```csharp
using LicenPro.SDK;
using LicenPro.Enums;

// Create the license client
var client = new LicenseClient(new LicenseClientOptions
{
    // Path to the license.bin file
    LicenseFilePath = @"C:\ProgramData\YourApp\License\license.bin",
    
    // RSA public key (Base64, without PEM headers)
    PublicKey = "MIIBCgKCAQEA...",
    
    // License key (must match generated key)
    LicenseKey = "LP-A1B2-C3D4-E5F6",
    
    // Verify it's a perpetual license
    ExpectedLicenseType = LicenseType.Perpetual,
    
    // Allow .bin files only (recommended)
    AllowNonBinFiles = false
});

// Validate the license
var result = await client.ValidateAsync();

if (result.IsValid)
{
    Console.WriteLine("✓ License Valid!");
    Console.WriteLine($"User: {client.License?.IssuedTo}");
    Console.WriteLine($"Expires: {client.License?.ExpirationDate?.ToString("yyyy-MM-dd") ?? "Never"}");
}
else
{
    Console.WriteLine($"✗ Validation Failed: {result.ErrorMessage}");
    Console.WriteLine($"Status: {result.Status}");
}
```

### Step 3: Online Validation with Session Tracking

```csharp
// Create the license client with online validation enabled
var client = new LicenseClient(new LicenseClientOptions
{
    LicenseFilePath = @"C:\ProgramData\YourApp\License\license.bin",
    PublicKey = "MIIBCgKCAQEA...",
    LicenseKey = "LP-A1B2-C3D4-E5F6",
    ExpectedLicenseType = LicenseType.Perpetual,
    
    // Enable online validation for session tracking
    ForceOnlineValidation = true,
    
    // Optional: Custom server endpoint
    ServerEndpoint = "https://your-licenpro-server.com/api"
});

// Handle session disconnection events
client.SessionDisconnected += (sender, message) =>
{
    Console.WriteLine($"⚠ Session Disconnected: {message}");
    // Show warning to user or attempt reconnection
};

// Validate the license
var result = await client.ValidateAsync();

if (result.IsValid)
{
    Console.WriteLine("✓ License Valid!");
    
    // Connect to dashboard for session tracking
    await client.ConnectSessionAsync();
    Console.WriteLine("✓ Session connected to dashboard");
    
    // Your application logic here...
    // The SDK will automatically send heartbeats every 5 minutes
    
    // When application closes, disconnect the session
    await client.DisconnectAsync();
}
```

---

## Validation Process

### Validation Steps (In Order)

1. **File Loading**
   - SDK reads the `license.bin` file
   - Checks file exists and is readable
   - Validates file format

2. **Signature Verification**
   - Extracts signature from license file
   - Verifies signature using RSA public key
   - Ensures file hasn't been tampered with

3. **License Type Check**
   - Compares license type with `ExpectedLicenseType`
   - Fails if types don't match

4. **Credential Validation**
   - Checks `LicenseKey` matches stored key

5. **Expiration Check**
   - If expiration date is set, checks if still valid
   - Perpetual licenses typically have no expiration

6. **Online Validation (Optional)**
   - Connects to dashboard API
   - Verifies license hasn't been revoked
   - Establishes session for tracking

7. **Feature Loading**
   - Loads assigned features from license
   - Makes features available via `FeatureManager`

8. **Session Heartbeat (Online Mode)**
   - Sends heartbeat every 5 minutes
   - Updates "Last Heartbeat" in dashboard
   - Keeps session alive

### Validation Status Codes

| Status | Description | Resolution |
|--------|-------------|------------|
| `Valid` | License is valid and active | Proceed with application |
| `InvalidFormat` | License file is corrupted | Re-download license file |
| `SignatureMismatch` | Signature verification failed | Check public key matches |
| `CredentialsMismatch` | LicenseKey doesn't match | Verify credentials |
| `WrongLicenseType` | License type doesn't match expected | Check license type |
| `Expired` | License has expired | Renew license |
| `Revoked` | License has been revoked | Contact support |
| `DeviceBlocked` | Device is blocked | Contact support |

---

## Session Management

### Online Mode Session Flow

1. **Session Establishment**
   ```csharp
   await client.ConnectSessionAsync();
   ```
   - SDK sends POST request to `/api/sessions/connect`
   - Dashboard creates session record
   - Returns JWT token for authentication

2. **Heartbeat Monitoring**
   - SDK automatically sends heartbeat every 5 minutes
   - Endpoint: POST `/api/sessions/heartbeat`
   - Updates `LastHeartbeat` timestamp
   - Keeps session status as "Online"

3. **Session Disconnection**
   ```csharp
   await client.DisconnectAsync();
   ```
   - SDK sends DELETE request to `/api/sessions/disconnect`
   - Dashboard marks session as "Offline"
   - Cleans up session resources

### Dashboard Session View

When online validation is enabled, you can monitor sessions in the dashboard:

**Session Information:**
- Display user
- Device name
- IP address
- Operating system
- Connection time
- Last heartbeat
- Online/Offline status

**Displayed user behavior:**
- Perpetual licenses: shows the PC user name (from the running machine)
- Other licenses: shows the user identity stored in the license file

**Available Actions:**
- Force disconnect session
- View session history
- Track usage analytics
- Monitor feature usage

---

## Feature Management

### Assigning Features in Dashboard

When creating a license, you can assign features:

```json
{
  "features": [
    {
      "name": "Pages Edit",
      "type": "Boolean",
      "value": true
    },
    {
      "name": "Export PDF",
      "type": "Boolean",
      "value": true
    },
    {
      "name": "Max Pages",
      "type": "Integer",
      "value": 100
    }
  ]
}
```

### Checking Features in SDK

```csharp
using LicenPro.Utilities;
using LicenPro.Exceptions;

// Check if a feature is enabled
if (FeatureManager.IsFeatureEnabled("Pages Edit"))
{
    // Enable the feature in your UI
    btnPagesEdit.Enabled = true;
}

// Throw exception if feature is not allowed
try
{
    FeatureManager.ThrowIfNotAllowed("Export PDF", trackUsage: true);
    
    // Feature is allowed, proceed with export
    ExportToPdf();
}
catch (FeatureNotLicensedException ex)
{
    MessageBox.Show(ex.Message, "Feature Not Available");
}

// Get feature value
int maxPages = FeatureManager.GetFeatureInt("Max Pages");

// Track feature usage for analytics
FeatureManager.TrackFeatureUsage("Pages Edit", new Dictionary<string, object>
{
    ["action"] = "save",
    ["pageCount"] = 5
});

// Get all assigned features
var allFeatures = FeatureManager.GetAllFeatures();
foreach (var feature in allFeatures)
{
    Console.WriteLine($"{feature.Key}: {feature.Value.Type}");
}
```

---

## Troubleshooting

### Common Issues

#### 1. Validation Fails with "CredentialsMismatch"

**Cause:** LicenseKey in SDK doesn't match the license file

**Solution:**
- Verify `LicenseKey` exactly matches generated key
- Check for extra spaces or special characters

#### 2. Validation Fails with "SignatureMismatch"

**Cause:** Public key doesn't match the private key used to sign the license

**Solution:**
- Ensure you're using the correct `PublicKey.pem` file
- Verify public key is Base64 encoded without PEM headers
- Re-download license package if corrupted

#### 3. Session Disconnects Frequently

**Cause:** Network issues or heartbeat timeout

**Solution:**
- Check internet connection stability
- Verify firewall allows connections to dashboard API
- Check dashboard server is accessible
- Review heartbeat interval settings

#### 4. Features Not Loading

**Cause:** License file doesn't contain feature data

**Solution:**
- Verify features were assigned in dashboard
- Re-generate license file with features
- Check feature names match exactly (case-sensitive)

#### 5. License File Not Found

**Cause:** Incorrect file path or file not deployed

**Solution:**
- Verify `LicenseFilePath` is correct
- Check file exists at specified location
- Ensure file has read permissions
- Use absolute paths instead of relative paths

---

## Best Practices

### 1. Credential Management

- Store license files in secure, stable locations
- Never hardcode license keys in source code
- Provide UI for users to import/update license files

### 2. Public Key Distribution

- Embed public key in your application
- Never distribute private keys
- Consider obfuscating public key in compiled code
- Rotate keys periodically for enhanced security

### 3. Error Handling

- Provide clear error messages to users
- Log validation failures for debugging
- Implement graceful degradation for expired licenses
- Offer renewal/upgrade paths in error dialogs

### 4. Online vs Offline Mode

- Use offline mode for air-gapped environments
- Use online mode for SaaS-like tracking
- Consider hybrid approach (offline with periodic online checks)
- Respect user privacy when collecting analytics

### 5. Session Management

- Always disconnect sessions on application exit
- Handle session disconnection events gracefully
- Implement reconnection logic for network issues
- Monitor session health in dashboard

---

## Summary

The perpetual license flow in LicenPro provides a secure, flexible licensing solution that:

1. **Dashboard** - Creates and manages licenses with RSA encryption
2. **SDK** - Validates licenses using cryptographic signatures
3. **User Machine** - Runs your application with license enforcement
4. **Monitoring** - Tracks usage and sessions (optional)

This architecture ensures:
- ✓ Tamper-proof licenses
- ✓ Offline validation support
- ✓ Optional online tracking
- ✓ Feature-based licensing
- ✓ Remote revocation capability
- ✓ Usage analytics

For more information, see:
- [SDK Documentation](../LicenPro-2024/SDK/LicenPro.SDK.lib/README.md)
- [API Documentation](../LicenPro SDK Test/COMPLETE_LICENPRO_DOCUMENTATION.md)
- [Testing Guide](../LicenPro SDK Test/Standard test/Perpetual/README.md)
