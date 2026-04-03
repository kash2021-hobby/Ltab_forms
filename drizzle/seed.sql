-- Seed admin credentials
INSERT INTO credentials (email, passwordHash, createdAt, updatedAt) 
VALUES ('kashyapnandan2021@gmail.com', '$2b$10$c7y07dhv1OF57SnixsGSpeNr6dN3afOCwEGPIVMu.AzrSIXAEf2X2', NOW(), NOW())
ON DUPLICATE KEY UPDATE updatedAt = NOW();
