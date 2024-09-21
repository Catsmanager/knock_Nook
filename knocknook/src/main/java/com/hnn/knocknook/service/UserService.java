package com.hnn.knocknook.service;

import com.hnn.knocknook.dto.AddUserRequest;
import com.hnn.knocknook.entity.User;
import com.hnn.knocknook.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UserService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    //회원가입 로직
    public Long save(AddUserRequest dto) {
        return userRepository.save(User.builder()
                .name(dto.getName())
                .email(dto.getEmail())
                .password(bCryptPasswordEncoder.encode(dto.getPassword()))
                .build()).getId();
    }

    public User findById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Unexpected User"));
    }
}
