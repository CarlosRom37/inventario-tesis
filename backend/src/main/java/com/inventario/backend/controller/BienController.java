package com.inventario.backend.controller;

import com.inventario.backend.model.Bien;
import com.inventario.backend.model.EstadoBien;
import com.inventario.backend.model.TipoBien;
import com.inventario.backend.service.BienService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/biens")
@CrossOrigin("*")
public class BienController {

    @Autowired
    private BienService bienService;

    // LISTAR
    @GetMapping
    public List<Bien> listarBiens() {
        return bienService.listarBiens();
    }

    // LISTAR BIENES CORRIENTES
    @GetMapping("/corrientes")
    public List<Bien> listarBienesCorrientes() {
        return bienService.buscarPorTipo(TipoBien.CORRIENTE);
    }

    // LISTAR BIENES PATRIMONIALES
    @GetMapping("/patrimoniales")
    public List<Bien> listarBienesPatrimoniales() {
        return bienService.buscarPorTipo(TipoBien.PATRIMONIAL);
    }

    // BUSCAR POR ID
    @GetMapping("/{id}")
    public Optional<Bien> obtenerBien(@PathVariable Long id) {
        return bienService.obtenerBien(id);
    }

    // BUSCAR POR NOMBRE
    @GetMapping("/buscar/nombre")
    public List<Bien> buscarPorNombre(@RequestParam String nombre) {
        return bienService.buscarPorNombre(nombre);
    }

    // BUSCAR POR CÓDIGO
    @GetMapping("/buscar/codigo")
    public List<Bien> buscarPorCodigo(@RequestParam String codigo) {
        return bienService.buscarPorCodigo(codigo);
    }

    // BUSCAR POR TIPO
    @GetMapping("/buscar/tipo")
    public List<Bien> buscarPorTipo(@RequestParam TipoBien tipoBien) {
        return bienService.buscarPorTipo(tipoBien);
    }

    // BUSCAR POR ESTADO
    @GetMapping("/buscar/estado")
    public List<Bien> buscarPorEstado(@RequestParam EstadoBien estado) {
        return bienService.buscarPorEstado(estado);
    }

    // BUSCAR POR UBICACIÓN
    @GetMapping("/buscar/ubicacion")
    public List<Bien> buscarPorUbicacion(@RequestParam String ubicacion) {
        return bienService.buscarPorUbicacion(ubicacion);
    }

    // CREAR
    @PostMapping
    public Bien guardarBien(@RequestBody Bien bien) {
        return bienService.guardarBien(bien);
    }

    // ELIMINAR
    @DeleteMapping("/{id}")
    public void eliminarBien(@PathVariable Long id) {
        bienService.eliminarBien(id);
    }

    // PRODUCTOS CON STOCK MÍNIMO
    @GetMapping("/stock-minimo")
    public List<Bien> biensStockMinimo() {
        return bienService.obtenerBiensStockMinimo();
    }

    // ACTUALIZAR BIEN
    @PutMapping("/{id}")
    public Bien actualizarBien(
            @PathVariable Long id,
            @RequestBody Bien bien) {

        return bienService.actualizarBien(id, bien);
    }

    // ACTUALIZAR SOLO EL ESTADO DEL BIEN
    @PutMapping("/{id}/estado")
    public Bien actualizarEstado(

            @PathVariable Long id,

            @RequestParam EstadoBien estado

    ) {

        return bienService.actualizarEstado(

                id,

                estado

        );

    }
}