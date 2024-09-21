package com.hnn.knocknook.service;

import com.hnn.knocknook.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import com.hnn.knocknook.entity.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UserDetailService implements UserDetailsService {
    private final UserRepository userRepository;

    @Override
    public User loadUserByUsername(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException(email));
    }
}
