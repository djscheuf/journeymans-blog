---
title: Pretty Good Encryption
tags:
  - algorithms
  - encryption
  - infrastructure
  - interprocess comminitation
  - protection
  - python
  - recent work
  - security
  - software
  - software dev
  - tool
  - tools
url: 614.html
id: 614
categories:
  - Software Development
  - Work Projects
date: 2016-09-13 15:00:32
---

![Bits and Bytes Lock](/img/post_img/crypto_lock.png) 
_(Edit: 2018/10/21 - It has come to my attention that this encryption scheme does not conform to PGP proper. As such, please consider this 'Pretty Good Encryption' rather than PGP. This post has been updated to accomodate the new terminology.)_

Shortly after starting with my new company, I began work on a back-end infrastructure project. To be specific, I am working on an inter-process-communication (hereafter IPC) layer. As the project developed, we realized the need to protect our data in transit. This is because we are working with Protect Health Information (hereafter PHI). It would be a disaster if the data became compromised. So to combat this, we are encrypting the data before it is send through the IPC layer. There are many fine encryption schemes available, but many are difficult to implement. Moreover, it is not enough to just encrypt the data. One cannot continue to use the same key for all applications without risk. Enough messages using the same key, and enough time mean someone could learn it. They would then be free to read all our messages and the possible PHI contained within. Our brilliant architect suggested that we use [Pretty Good Encryption](https://en.wikipedia.org/wiki/Pretty_Good_Privacy) or PGE for short. 

 It is an easy to implement encryption scheme that combines many desirable features. PGP uses a new random key for each message to encrypt the outbound data. This key is itself encrypted by a known private key, and is sent along with the encrypted message. Since the key is random every time, it is difficult to guess the private key. As a result, one cannot decrypt the public key, thus the message is reasonably safe. To help explain this, I have crafted a simple example in python code, using a [Vigenere Cipher](https://en.wikipedia.org/wiki/Vigen%C3%A8re_cipher). You can find the entire example project on my GitHub Repo, [here](https://github.com/djscheuf/ProgamingPractice/blob/Playground/Playground/Cryptography/PGP/example.py). But the core of the example is as follows:
```python
def encodePGE(self,plainMsg): 
# generate random key 

randKey = self._generateRandomKey() 
print("> Internal Random Key: "+randKey) 

# encrypt input with ^ 
cryptographer = Crypto() 
encryptedMsg = cryptographer.encode(randKey,plainMsg) 

# encrypt random key with priv. 
key pubKey = cryptographer.encode(self.privateKey,randKey) 

#return concat encrypted key and input 
return pubKey + "_"+encryptedMsg
```
For those who prefer, a visual representation of this is available on the Wikipedia page for PGP. The algorithm is as I stated before:

1.  Generate a Random Key for the message
2.  Encrypt the message with the Random key
3.  Encrypt the Random Key with the Private Key, to form the public key
4.  Concatenate the Encrypted Message and Public Key

The code for Decoding is as follows:
```python
def decodePGE(self,concatMsg): 
#parse encrypted pub key, encrypted message 
parsed = concatMsg.split("_") 
pubKey = parsed[0] 
encryptedMsg = parsed[1] 

# decrypt rand key with priv. key 
cryptographer = Crypto() 
randKey = cryptographer.decode(self.privateKey, pubKey)
 
# decrypt message with rand key 
decryptedMsg = cryptographer.decode(randKey,encryptedMsg) 

#return message 
return decryptedMsg
```
In plain terms the decryption steps are:

1.  Parse the input message to get the Public Key and the Encrypted Message
2.  Decrypt the Public key with the Private key, to form the original Random Key
3.  Use the Random Key to Decrypt the Encrypted Message

Ridiculously simple right?! However, this method can be rendered vulnerable by using a weak encryption method, such as the Vigenere Cipher, as I have. Though,it should be clear that a PGP-Vigenere is stronger that Vigenere alone. As you can see, with a strong encryption method, PGP adds a significant increase in security. The cost is that it increases the complexity in a limited fashion. Naturally, I will be adding this to my tool kit for future projects! I hope this explanation and example has been helpful. But I admit the diagram on Wikipedia provides a good outline of the PGE scheme. For anyone interested, you can download the example and the Vigenere Cipher implementation [here](https://github.com/djscheuf/ProgamingPractice/tree/Playground/Playground/Cryptography/PGP).