package com.aptechph.task_management_system.users.services.impl;

import com.aptechph.task_management_system.users.dto.UserRequest;
import com.aptechph.task_management_system.users.dto.UserResponse;
import com.aptechph.task_management_system.users.exception.ResourceNotFoundException;
import com.aptechph.task_management_system.users.mapper.UserMapper;
import com.aptechph.task_management_system.users.model.User;
import com.aptechph.task_management_system.users.repository.UserRepository;
import com.aptechph.task_management_system.users.services.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    @Override
    public UserResponse createUser(UserRequest request) {
        User user = userMapper.toEntity(request);
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());
        User saved = userRepository.save(user);
        return userMapper.toResponse(saved);
    }

    @Override
    public UserResponse getUserById(Long Id) {
        User user = userRepository.findById(Id).orElseThrow(() ->
                new ResourceNotFoundException("User not found with id: " + Id));
        return userMapper.toResponse(user);
    }

    @Override
    public List<UserResponse> getAllUser() {
        List<User> users = userRepository.findAll();
        return users.stream().map(userMapper::toResponse).toList();
    }

    @Override
    public UserResponse updateUser(Long id, UserRequest request){
        User user = userRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("User not found with id: "+id));
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setFullName(request.getFullName());
        user.setUpdatedAt(LocalDateTime.now());
        User updated = userRepository.save(user);
        return userMapper.toResponse(updated);
    }

    @Override
    public void deleteUser(long id){
        if(!userRepository.existsById(id)){
            throw new ResourceNotFoundException("user not found with this id: "+id);
        }
        userRepository.deleteById(id);
    }
}
