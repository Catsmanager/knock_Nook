package com.hnn.knocknook.config.jwt;

import com.hnn.knocknook.entity.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.time.Duration;
import java.util.Collections;
import java.util.Date;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class JwtTokenProvider {
    private final JwtProperties jwtProperties;

    public String generateToken(User user, Duration expiredAt) {
        Date now = new Date();
        return makeToken(new Date(now.getTime() + expiredAt.toMillis()), user);
    }

    //jwt 토큰 생성
    private String makeToken(Date expiry, User user) {
        Date now = new Date();
        Key key = Keys.hmacShaKeyFor(jwtProperties.getSecretKey().getBytes());

        return Jwts.builder()
                .setSubject(user.getEmail())
                .setIssuedAt(now)
                .setExpiration(expiry)
                .signWith(key)
                .compact();
    }

    //토큰 유효성 검증
    public boolean validToken(String token) {
        try {
            Key key = Keys.hmacShaKeyFor(jwtProperties.getSecretKey().getBytes());
            Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    //토큰 기반 인증 정보 가져오기
    public Authentication getAuthentication(String token) {
        Claims claims = getClaims(token);
        Set<SimpleGrantedAuthority> authorities = Collections.singleton(new SimpleGrantedAuthority("ROLE_USER"));

        return new UsernamePasswordAuthenticationToken(new org.springframework.security.core.userdetails.
                User(claims.getSubject(), "", authorities), token, authorities);
    }

    //토큰 기반 유저 ID 가져오기
    public Long getUserId(String token) {
        Claims claims = getClaims(token);
        return claims.get("id", Long.class);
    }

    private Claims getClaims(String token) {
        Key key = Keys.hmacShaKeyFor(jwtProperties.getSecretKey().getBytes());
        return Jwts.parserBuilder() //클레임 조회
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
