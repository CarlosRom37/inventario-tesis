package com.inventario.backend.service;

import com.inventario.backend.model.Bien;
import com.inventario.backend.model.EstadoBien;
import com.inventario.backend.model.TipoBien;
import com.inventario.backend.repository.BienRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class BienService {

    @Autowired
    private BienRepository bienRepository;

    // ============================
    // LISTAR
    // ============================

    public List<Bien> listarBiens() {
        return bienRepository.findAll();
    }

    // ============================
    // BUSCAR POR ID
    // ============================

    public Optional<Bien> obtenerBien(Long id) {
        return bienRepository.findById(id);
    }

    // ============================
    // BUSCAR POR CÓDIGO
    // ============================

    public List<Bien> buscarPorCodigo(String codigo){
        return bienRepository.findByCodigo(codigo);
    }

    // ============================
    // BUSCAR POR NOMBRE
    // ============================

    public List<Bien> buscarPorNombre(String nombre) {
        return bienRepository.findByNombreContainingIgnoreCase(nombre);
    }

    // ============================
    // BUSCAR POR TIPO
    // ============================

    public List<Bien> buscarPorTipo(TipoBien tipoBien) {
        return bienRepository.findByTipoBien(tipoBien);
    }

    // ============================
    // BUSCAR POR ESTADO
    // ============================

    public List<Bien> buscarPorEstado(EstadoBien estado) {
        return bienRepository.findByEstado(estado);
    }

    // ============================
    // BUSCAR POR UBICACIÓN
    // ============================

    public List<Bien> buscarPorUbicacion(String ubicacion) {
        return bienRepository.findByUbicacionContainingIgnoreCase(ubicacion);
    }

    // ============================
    // REGISTRAR
    // ============================

    public Bien guardarBien(Bien bien) {

        if (bien.getFechaRegistro() == null) {
            bien.setFechaRegistro(LocalDate.now());
        }

        aplicarReglasTipoBien(bien);

        return bienRepository.save(bien);
    }

    // ============================
    // ACTUALIZAR
    // ============================

    public Bien actualizarBien(Long id, Bien bienActualizado) {

        Bien bien = bienRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Bien no encontrado"));

        bien.setCodigo(bienActualizado.getCodigo());
        bien.setNombre(bienActualizado.getNombre());
        bien.setTipoBien(bienActualizado.getTipoBien());
        bien.setUbicacion(bienActualizado.getUbicacion());

        bien.setMarca(bienActualizado.getMarca());
        bien.setUnidadMedida(bienActualizado.getUnidadMedida());
        bien.setPrecioUnitario(bienActualizado.getPrecioUnitario());
        bien.setStockActual(bienActualizado.getStockActual());
        bien.setStockMinimo(bienActualizado.getStockMinimo());

        bien.setModelo(bienActualizado.getModelo());
        bien.setSerie(bienActualizado.getSerie());
        bien.setEstado(bienActualizado.getEstado());

        // No se modifica la fechaRegistro

        aplicarReglasTipoBien(bien);

        return bienRepository.save(bien);
    }

        // ============================
        // ACTUALIZAR ESTADO
        // ============================

        public Bien actualizarEstado(

                Long id,

                EstadoBien estado

        ) {

            Bien bien = bienRepository.findById(id)

                    .orElseThrow(() ->

                            new RuntimeException("Bien no encontrado")

                    );

            // Solo los bienes patrimoniales tienen estado

            if (bien.getTipoBien() == TipoBien.CORRIENTE) {

                throw new RuntimeException(

                        "Los bienes corrientes no tienen estado."

                );

            }

            bien.setEstado(estado);

            return bienRepository.save(bien);

        }


    // ============================
    // ELIMINAR
    // ============================

    public void eliminarBien(Long id) {
        bienRepository.deleteById(id);
    }

    // ============================
    // STOCK MÍNIMO
    // ============================

    public List<Bien> obtenerBiensStockMinimo() {

        return bienRepository.findAll()
                .stream()
                .filter(bien ->

                        bien.getStockActual() != null &&
                        bien.getStockMinimo() != null &&
                        bien.getStockActual() <= bien.getStockMinimo()

                )
                .toList();
    }

    // ============================
    // REGLAS DE NEGOCIO
    // ============================

    private void aplicarReglasTipoBien(Bien bien) {

        if (bien.getTipoBien() == TipoBien.CORRIENTE) {

            // Los bienes corrientes no usan estos campos

            bien.setModelo(null);
            bien.setSerie(null);
            bien.setEstado(null);

        } else {

            // Los bienes patrimoniales no usan estos campos

            bien.setUnidadMedida(null);
            bien.setPrecioUnitario(null);
            bien.setStockActual(null);
            bien.setStockMinimo(null);

            // Estado por defecto

            if (bien.getEstado() == null) {

                bien.setEstado(EstadoBien.N);

            }
        }
    }
}