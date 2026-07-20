package com.inventario.backend.controller;

import com.inventario.backend.model.Movimiento;
import com.inventario.backend.service.MovimientoService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/movimientos")
@CrossOrigin("*")
public class MovimientoController {

    @Autowired
    private MovimientoService movimientoService;

    // LISTAR MOVIMIENTOS
    @GetMapping
    public List<Movimiento> listarMovimientos() {
        return movimientoService.listarMovimientos();
    }

    // REGISTRAR ENTRADA
    @PostMapping("/entrada")
    public Movimiento registrarEntrada(

            @RequestParam Long bienId,
            @RequestParam Long usuarioId,
            @RequestParam Long areaId,
            @RequestParam Integer cantidad,
            @RequestParam String observacion
    ) {

        return movimientoService.registrarEntrada(

                bienId,
                usuarioId,
                areaId,
                cantidad,
                observacion

        );

    }

    // REGISTRAR SALIDA
    @PostMapping("/salida")
    public Movimiento registrarSalida(

            @RequestParam Long bienId,
            @RequestParam Long usuarioId,
            @RequestParam Long areaId,
            @RequestParam Integer cantidad,
            @RequestParam String observacion
    ) {

        return movimientoService.registrarSalida(

                bienId,
                usuarioId,
                areaId,
                cantidad,
                observacion

        );

    }
}