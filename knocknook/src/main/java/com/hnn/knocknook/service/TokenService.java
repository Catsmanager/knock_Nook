package com.hnn.knocknook.service;

import com.hnn.knocknook.config.jwt.JwtTokenProvider;
import com.hnn.knocknook.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Duration;

@RequiredArgsConstructor
@Service
public class TokenService {

    private final JwtTokenProvider jwtTokenProvider;
    private final RefreshTokenService refreshTokenService;
    private final UserService userService;

    public String createNewAccessToken(String refreshToken) {
        if (!jwtTokenProvider.validToken(refreshToken)) {
            throw new IllegalArgumentException("Unexpected Token");
        }

        Long userId = refreshTokenService.findByRefreshToken(refreshToken).getUserId();
        User user = userService.findById(userId);

        return jwtTokenProvider.generateToken(user, Duration.ofHours(1));
    }
}
