package com.example.muconnbackend.Service;

import io.jsonwebtoken.*;
import org.springframework.stereotype.Service;

import javax.crypto.spec.SecretKeySpec;
import java.security.Key;
import java.security.SecureRandom;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class TokenService {
    private String secretKey;
    public String generateToken(String username) {
        long expirationTimeInMs = Long.MAX_VALUE;

        if (secretKey == null) {
            secretKey = generateRandomSecretKey();
        }

        Date now = new Date();
        Date expirationDate = new Date(now.getTime() + expirationTimeInMs);

        Key key = new SecretKeySpec(secretKey.getBytes(), SignatureAlgorithm.HS512.getJcaName());

        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(now)
                .setExpiration(expirationDate)
                .signWith(key)
                .compact();
    }

    public String getUsernameFromToken(String token) {
        try {
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(secretKey.getBytes())
                    .build()
                    .parseClaimsJws(token)
                    .getBody();

            return claims.getSubject();
        } catch (Exception e) {
            return null;
        }
    }
    public Map<String, String> generateTokens(String username) {
        long accessTokenExpirationTimeInMs = 3600000;
        long refreshTokenExpirationTimeInMs = 604800000;

        if (secretKey == null) {
            secretKey = generateRandomSecretKey();
        }

        Date now = new Date();
        Date accessTokenExpirationDate = new Date(now.getTime() + accessTokenExpirationTimeInMs);
        Date refreshTokenExpirationDate = new Date(now.getTime() + refreshTokenExpirationTimeInMs);

        Key key = new SecretKeySpec(secretKey.getBytes(), SignatureAlgorithm.HS512.getJcaName());

        String accessToken = Jwts.builder()
                .setSubject(username)
                .setIssuedAt(now)
                .setExpiration(accessTokenExpirationDate)
                .signWith(key)
                .compact();

        String refreshToken = Jwts.builder()
                .setSubject(username)
                .setIssuedAt(now)
                .setExpiration(refreshTokenExpirationDate)
                .signWith(key)
                .compact();

        Map<String, String> tokens = new HashMap<>();
        tokens.put("accessToken", accessToken);
        tokens.put("refreshToken", refreshToken);

        return tokens;
    }

    public String generateRandomSecretKey() {
        SecureRandom secureRandom = new SecureRandom();
        byte[] key = new byte[32];
        secureRandom.nextBytes(key);
        return Base64.getEncoder().encodeToString(key);
    }

    public boolean validateToken(String token) {
        try {
            Key key = new SecretKeySpec(secretKey.getBytes(), SignatureAlgorithm.HS512.getJcaName());

            Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token);

            return true;
        } catch (ExpiredJwtException | UnsupportedJwtException | MalformedJwtException | IllegalArgumentException e) {
            return false;
        }
    }
}
