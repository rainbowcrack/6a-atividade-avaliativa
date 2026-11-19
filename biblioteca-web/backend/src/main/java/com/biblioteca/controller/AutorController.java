package com.biblioteca.controller;

import com.biblioteca.model.Autor;
import com.biblioteca.repository.AutorRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/autores")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class AutorController {

    private final AutorRepository repository;

    @PostMapping
    public ResponseEntity<Autor> criar(@Valid @RequestBody Autor autor) {
        autor.setId(null);
        return ResponseEntity.status(HttpStatus.CREATED).body(repository.save(autor));
    }

    @GetMapping
    public List<Autor> listar() {
        return repository.findAllByOrderByNomeAsc();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Autor> buscar(@PathVariable Long id) {
        Optional<Autor> autor = repository.findById(id);
        if (autor.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(autor.get());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Autor> atualizar(@PathVariable Long id, @Valid @RequestBody Autor dados) {
        Optional<Autor> existente = repository.findById(id);
        if (existente.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Autor autor = existente.get();
        autor.setNome(dados.getNome());
        autor.setNacionalidade(dados.getNacionalidade());
        autor.setDataNascimento(dados.getDataNascimento());
        return ResponseEntity.ok(repository.save(autor));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        if (!repository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        repository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
