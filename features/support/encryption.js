const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const secretKey = 'f6a5c6e6d5b0b2339f1b4d8e2f0d3e7c5b8f0a2b6d4c9e0a4a2e1b2f0c8d9a7e1';

function encrypt(text) {
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey, 'hex'), Buffer.alloc(16, 0)); 
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

function decrypt(encryptedText) {
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(secretKey, 'hex'), Buffer.alloc(16, 0));
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

module.exports = { encrypt, decrypt };