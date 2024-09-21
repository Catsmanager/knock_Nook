package com.hnn.knocknook.controller;

import com.hnn.knocknook.config.jwt.JwtTokenProvider;
import com.hnn.knocknook.dto.AddUserRequest;
import com.hnn.knocknook.dto.LoginRequest;
import com.hnn.knocknook.entity.User;
import com.hnn.knocknook.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.time.Duration;

@RequiredArgsConstructor
@RestController
public class UserController {
    private final UserService userService;
    private final JwtTokenProvider jwtTokenProvider;
    private final AuthenticationManager authenticationManager;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody AddUserRequest request) {
        userService.save(request);
        return ResponseEntity.status(HttpStatus.CREATED).body("가입 완료");
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest) {
        UsernamePasswordAuthenticationToken authenticationToken
                = new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword());

        Authentication authentication = authenticationManager.authenticate(authenticationToken);

        String token = jwtTokenProvider.generateToken((User) authentication.getPrincipal(), Duration.ofHours(1));

        return ResponseEntity.ok(token);
    }

    @GetMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response) {
        new SecurityContextLogoutHandler().logout(request, response,
                SecurityContextHolder.getContext().getAuthentication());
        return ResponseEntity.ok("로그아웃 성공");
    }
}
