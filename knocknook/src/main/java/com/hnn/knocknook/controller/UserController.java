package com.hnn.knocknook.controller;

import com.hnn.knocknook.config.jwt.JwtTokenProvider;
import com.hnn.knocknook.dto.AddUserRequest;
import com.hnn.knocknook.dto.LoginRequest;
import com.hnn.knocknook.entity.User;
import com.hnn.knocknook.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;
import java.util.HashMap;
import java.util.Map;

@RequiredArgsConstructor
@RestController
public class UserController {
    private final UserService userService;
    private final JwtTokenProvider jwtTokenProvider;
    private final AuthenticationManager authenticationManager;
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @PostMapping("/signup")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<?> signup(@RequestBody AddUserRequest request) {
        logger.info("signup request received with data : {}", request);
        userService.save(request);
        Map<String, String> response = new HashMap<>();
        response.put("message","Signup successful");
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/login")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Map<String, String>> login(@RequestBody LoginRequest loginRequest) {
        logger.info("login request received with data : {}", loginRequest);
        UsernamePasswordAuthenticationToken authenticationToken
                = new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword());

        Authentication authentication = authenticationManager.authenticate(authenticationToken);

        String token = jwtTokenProvider.generateToken((User) authentication.getPrincipal(), Duration.ofHours(1));

        Map<String, String> response = new HashMap<>();
        response.put("token", token);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/logout")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Map<String, String>> logout(HttpServletRequest request, HttpServletResponse response) {
        logger.info("logout request received with data : {}", request);
        new SecurityContextLogoutHandler().logout(request, response,
                SecurityContextHolder.getContext().getAuthentication());

        Map<String, String> responseBody = new HashMap<>();
        responseBody.put("message", "Logout successful");
        return ResponseEntity.ok(responseBody);
    }
}
