package com.aptechph.task_management_system.users.services;

import com.aptechph.task_management_system.users.dto.UserRequest;
import com.aptechph.task_management_system.users.dto.UserResponse;

import java.util.List;

public interface UserService {
    UserResponse createUser(UserRequest request);
    UserResponse getUserById(Long Id);
    List<UserResponse> getAllUser();


    UserResponse updateUser(Long id, UserRequest request);

    void deleteUser(long id);
}
