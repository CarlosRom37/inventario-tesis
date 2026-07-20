package com.inventario.backend.service;

import com.inventario.backend.model.Usuario;
import com.inventario.backend.repository.UsuarioRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    // LISTAR
    public List<Usuario> listarUsuarios() {
        return usuarioRepository.findAll();
    }

    // BUSCAR POR ID
    public Optional<Usuario> obtenerUsuario(Long id) {
        return usuarioRepository.findById(id);
    }

    // GUARDAR
    public Usuario guardarUsuario(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    // ELIMINAR
    public void eliminarUsuario(Long id) {
        usuarioRepository.deleteById(id);
    }
}