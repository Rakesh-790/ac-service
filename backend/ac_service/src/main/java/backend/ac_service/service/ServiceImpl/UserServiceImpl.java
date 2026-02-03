package backend.ac_service.service.ServiceImpl;

import org.springframework.stereotype.Service;

import backend.ac_service.entity.User;
import backend.ac_service.service.IUserService;

@Service
public class UserServiceImpl implements IUserService {
    
    @Override
    public User authenticate() {
        return null;
    }
}
