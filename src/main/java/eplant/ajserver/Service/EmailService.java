package eplant.ajserver.Service;

import eplant.ajserver.Model.User;
import eplant.ajserver.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    @Autowired
    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendRegistrationApprovalEmail(User user) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromEmail);
        message.setTo(user.getEmail());
        message.setSubject("Account Approved - E-Plant");
        message.setText("Dear " + user.getName() + ",\n\n" +
                "Your account has been approved by the admin.\n" +
                "You can now login and start shopping.\n\n" +
                "Best Regards,\nE-Plant Team");
        mailSender.send(message);
    }

    public void sendOrderConfirmationEmail(User user, String orderId, double total) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromEmail);
        message.setTo(user.getEmail());
        message.setSubject("Order Confirmed - E-Plant #" + orderId);
        message.setText("Dear " + user.getName() + ",\n\n" +
                "Your order #" + orderId + " has been placed successfully.\n" +
                "Total: Rs. " + total + "\n\n" +
                "Best Regards,\nE-Plant Team");
        mailSender.send(message);
    }

    public void sendWelcomeEmail(User user) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromEmail);
        message.setTo(user.getEmail());
        message.setSubject("Welcome to E-Plant!");
        message.setText("Dear " + user.getName() + ",\n\n" +
                "Thank you for registering with E-Plant.\n" +
                "Your account is pending admin approval. You will be notified once approved.\n\n" +
                "Best Regards,\nE-Plant Team");
        mailSender.send(message);
    }
}
