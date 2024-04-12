import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { firebase } from '../../firebase/config';
import {
    TextField,
    Button,
    Avatar,
    Grid,
    Box,
    IconButton,
    InputAdornment,
    FormControlLabel,
    Switch,
    FormControl,
    FormLabel,
    RadioGroup,
    Radio
  } from '@mui/material';
  import { PhotoCamera, CalendarToday, PersonOutline } from '@mui/icons-material';
  import { styled } from '@mui/system';

  const FormContainer = styled(Box)(({ theme }) => ({
    maxWidth: 600,
    margin: 'auto',
    padding: theme.spacing(3),
  }));

function Form({ user, onSave }) {
  const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm();
  const [isAvatarRound, setIsAvatarRound] = useState(true);
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');

    React.useEffect(() => {
    if (user) {
    Object.keys(user).forEach(key => {
        setValue(key, user[key]);
    });
    } else {
    reset(); 
    }
}, [user, setValue, reset]);

    const onSubmit = data => {
        const { fotoPerfil, ...rest } = data;
        const firestore = firebase.firestore();
    onSave(data, user?.id);
    };

    const handleAvatarShapeChange = (event) => {
        setIsAvatarRound(event.target.checked);
    };

return (
    <FormContainer>
        <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
                <h3>Fale-nos um pouco sobre você</h3>
                <p style={{fontSize: "13px", color: "#808080"}}>Diga quem você é, como os empregadores podem entrar em contato com você.</p>
            <TextField
                fullWidth
                label="Nome"
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                {...register("nome", { required: "Este campo é obrigatório." })}
                error={!!errors.nome}
                helperText={errors.nome?.message}
            />
        </Grid>
        <Grid item xs={12} sm={6}>
            <Box textAlign="center" pt={3}>
                <Avatar
                    src={uploadedImageUrl}
                    sx={{
                    width: 90,
                    height: 90,
                    margin: 'auto',
                    borderRadius: isAvatarRound ? '50%' : '0%',
                }}> {!uploadedImageUrl && <PersonOutline />}
                </Avatar>
        <input
            accept="image/*"
            style={{ display: 'none' }}
            id="icon-button-file"
            type="file"
            onChange={""}
            {...register("fotoPerfil")}
        />
        <label htmlFor="icon-button-file">
            <IconButton color="primary" aria-label="upload picture" component="span">
            <PhotoCamera />
            </IconButton>
        </label>
        <FormControlLabel
            control={
            <Switch
                checked={isAvatarRound}
                onChange={handleAvatarShapeChange}
            />
            }
            label="Foto Redonda"
        />
        </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
            <TextField 
                fullWidth
                label="Sobrenome"
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                {...register("sobrenome")}
            />
        </Grid>
        <Grid item xs={12}>
        <TextField
            fullWidth
            label="Emprego"
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            {...register("emprego")}
        />
        </Grid>
        <Grid item xs={12}>
        <TextField
            fullWidth
            label="Endereço"
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            {...register("endereco")}
        />
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
            fullWidth
            label="Telefone"
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            {...register("telefone")}
        />
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
            fullWidth
            label="Cargo"
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            {...register("cargo")}
        />
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
            fullWidth
            label="Setor"
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            {...register("setor")}
        />
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
            fullWidth
            label="Salario"
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            {...register("salario")}
        />
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
            fullWidth
            label="Data de Admissão"
            type="date"
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            {...register("dataAdmissão")}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                    <CalendarToday />
                    </InputAdornment>
                ),
                }}
        />
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
            fullWidth
            label="Data de nascimento"
            type="date"
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            {...register("dataNascimento")}
            InputProps={{
            endAdornment: (
                <InputAdornment position="end">
                <CalendarToday />
                </InputAdornment>
            ),}}
        />
        </Grid>
        <Grid item xs={12}>
            <FormControl component="fieldset">
            <FormLabel component="legend">Sexo</FormLabel>
            <RadioGroup row aria-label="sexo" name="row-radio-buttons-group">
                <FormControlLabel
                value="feminino"
                control={<Radio />}
                label="Feminino"
                {...register("sexo")}
                />
                <FormControlLabel
                value="masculino"
                control={<Radio />}
                label="Masculino"
                {...register("sexo")}
                />
                <FormControlLabel
                value="outro"
                control={<Radio />}
                label="Outro"
                {...register("sexo")}
                />
            </RadioGroup>
            </FormControl>
        </Grid>
        <Grid item xs={12}>
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        {user ? 'Atualizar' : 'Cadastrar'}
            </Button>
        </Grid>
    </Grid>
    </form>
</FormContainer>
);
}

export default Form;