package com.inventario.backend.service;

import com.inventario.backend.model.Movimiento;
import com.inventario.backend.model.Bien;
import com.inventario.backend.repository.MovimientoRepository;
import com.inventario.backend.repository.BienRepository;
import com.inventario.backend.model.Usuario;
import com.inventario.backend.repository.UsuarioRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import com.inventario.backend.model.Area;
import com.inventario.backend.repository.AreaRepository;


@Service
public class MovimientoService {

    @Autowired
    private MovimientoRepository movimientoRepository;

    @Autowired
    private BienRepository bienRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private AreaRepository areaRepository;

    // LISTAR MOVIMIENTOS
    public List<Movimiento> listarMovimientos() {
        return movimientoRepository.findAll();
    }

    // REGISTRAR ENTRADA
    public Movimiento registrarEntrada(
        Long bienId,
        Long usuarioId,
        Long areaId,
        Integer cantidad,
        String observacion) {

        Bien bien = bienRepository.findById(bienId)
                .orElseThrow(() -> new RuntimeException("Bien no encontrado"));

        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        Area area = areaRepository.findById(areaId)
        .orElseThrow(() -> new RuntimeException("Área no encontrada"));

        // GUARDAR STOCK ANTERIOR
        Integer stockAnterior = bien.getStockActual();

        // ACTUALIZAR STOCK
        Integer stockNuevo = stockAnterior + cantidad;
        bien.setStockActual(stockNuevo);

        bienRepository.save(bien);

        // REGISTRAR MOVIMIENTO
        Movimiento movimiento = new Movimiento();
        movimiento.setTipoMovimiento("ENTRADA");
        movimiento.setCantidad(cantidad);
        movimiento.setStockAnterior(stockAnterior);
        movimiento.setStockNuevo(stockNuevo);
        movimiento.setFechaMovimiento(LocalDateTime.now());
        movimiento.setObservacion(observacion);
        movimiento.setBien(bien);
        movimiento.setUsuario(usuario);
        movimiento.setArea(area);

        return movimientoRepository.save(movimiento);
    }

    // REGISTRAR SALIDA
    public Movimiento registrarSalida(
        Long bienId,
        Long usuarioId,
        Long areaId,
        Integer cantidad,
        String observacion) {

        Bien bien = bienRepository.findById(bienId)
                .orElseThrow(() -> new RuntimeException("Bien no encontrado"));

        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        Area area = areaRepository.findById(areaId)
        .orElseThrow(() -> new RuntimeException("Área no encontrada"));

        Integer stockAnterior = bien.getStockActual();

        // VALIDAR STOCK
        if (stockAnterior < cantidad) {
            throw new RuntimeException("Stock insuficiente");
        }

        // ACTUALIZAR STOCK
        Integer stockNuevo = stockAnterior - cantidad;
        bien.setStockActual(stockNuevo);

        bienRepository.save(bien);

        // REGISTRAR MOVIMIENTO
        Movimiento movimiento = new Movimiento();
        movimiento.setTipoMovimiento("SALIDA");
        movimiento.setCantidad(cantidad);
        movimiento.setStockAnterior(stockAnterior);
        movimiento.setStockNuevo(stockNuevo);
        movimiento.setFechaMovimiento(LocalDateTime.now());
        movimiento.setObservacion(observacion);
        movimiento.setBien(bien);
        movimiento.setUsuario(usuario);
        movimiento.setArea(area);

        return movimientoRepository.save(movimiento);
    }
}