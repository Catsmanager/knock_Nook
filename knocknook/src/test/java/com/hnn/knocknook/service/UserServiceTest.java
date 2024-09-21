package com.hnn.knocknook.service;

import com.hnn.knocknook.dto.AddUserRequest;
import com.hnn.knocknook.repository.UserRepository;
import com.hnn.knocknook.entity.User;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @InjectMocks
    private UserService userService;

    public UserServiceTest() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testSave() {
        // given
        AddUserRequest dto = new AddUserRequest();
        dto.setName("Test User");
        dto.setEmail("test@example.com");
        dto.setPassword("password123");

        String encodedPassword = "encodedPassword";
        when(bCryptPasswordEncoder.encode(dto.getPassword())).thenReturn(encodedPassword);

        User savedUser = User.builder()
                //.id(1L)
                .name(dto.getName())
                .email(dto.getEmail())
                .password(encodedPassword)
                .build();
        when(userRepository.save(any(User.class))).thenReturn(savedUser);

        // when
        Long resultId = userService.save(dto);

        // then
        assertEquals(1L, resultId);
    }
}