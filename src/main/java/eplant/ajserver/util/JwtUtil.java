package eplant.ajserver.util;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class JwtUtil {

    @Value("${md5.secret:mySecretKey}")
    private String secret;

    public String extractUsername(String token) {
        return token.split(":")[0];
    }

    public Date extractExpiration(String token) {
        long expiry = Long.parseLong(token.split(":")[1]);
        return new Date(expiry * 1000);
    }

    public String extractRole(String token) {
        return token.split(":")[2];
    }

    public <T> T extractClaim(String token, Function<Map<String, Object>, T> claimsResolver) {
        Map<String, Object> claims = new HashMap<>();
        String[] parts = token.split(":");
        claims.put("sub", parts[0]);
        claims.put("exp", Long.parseLong(parts[1]));
        claims.put("role", parts[2]);
        return claimsResolver.apply(claims);
    }

    public String generateToken(String email, String role) {
        long expiry = LocalDateTime.now().plusHours(24).toEpochSecond(ZoneOffset.UTC);
        String raw = email + ":" + expiry + ":" + role + ":" + secret;
        String hash = md5(raw);
        return email + ":" + expiry + ":" + role + ":" + hash;
    }

    public Boolean validateToken(String token, UserDetails userDetails) {
        try {
            String[] parts = token.split(":");
            if (parts.length != 4) return false;
            String email = parts[0];
            long expiry = Long.parseLong(parts[1]);
            String role = parts[2];
            String hash = parts[3];

            if (!email.equals(userDetails.getUsername())) return false;
            if (new Date().after(new Date(expiry * 1000))) return false;

            String raw = email + ":" + expiry + ":" + role + ":" + secret;
            return md5(raw).equals(hash);
        } catch (Exception e) {
            return false;
        }
    }

    private String md5(String input) {
        try {
            Mac mac = Mac.getInstance("HmacSHA256");
            mac.init(new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), "HmacSHA256"));
            byte[] digest = mac.doFinal(input.getBytes(StandardCharsets.UTF_8));
            StringBuilder sb = new StringBuilder();
            for (byte b : digest) {
                sb.append(String.format("%02x", b));
            }
            return sb.toString();
        } catch (Exception e) {
            throw new RuntimeException("Token generation error", e);
        }
    }
}
