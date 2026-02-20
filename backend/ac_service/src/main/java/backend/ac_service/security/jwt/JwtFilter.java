package backend.ac_service.security.jwt;

import java.io.IOException;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

    private final JwtUtils jwtUtils;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {

        String token = null;

        try {
            if (request.getCookies() != null) {
                for (Cookie cookie : request.getCookies()) {
                    if ("accessToken".equals(cookie.getName())) {
                        token = cookie.getValue();
                    }
                }
            }

            if (token == null) {
                filterChain.doFilter(request, response);
                return;
            }

            // Extract username & role
            String username = jwtUtils.getUsername(token);
            String role = jwtUtils.getUserRole(token);

            if (username != null && SecurityContextHolder.getContext().getAuthentication() == null
                    && jwtUtils.validateToken(token, username)) {
                var authorities = List.of(new SimpleGrantedAuthority(role));

                var authentication = new UsernamePasswordAuthenticationToken(
                        username, // principal = username
                        null,
                        authorities);

                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
            filterChain.doFilter(request, response);

        } catch (Exception e) {
            var problemDetail = ProblemDetail.forStatus(HttpStatus.UNAUTHORIZED);
            problemDetail.setTitle("Invalid Token");
            problemDetail.setDetail(e.getMessage());

            response.setContentType("application/json");
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().println(problemDetail);
        }
    }
}
