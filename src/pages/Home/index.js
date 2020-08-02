import React, { useEffect, useState } from 'react';
import BannerMain from '../../components/BannerMain';
import Carousel from '../../components/Carousel';
import PageDefault from '../../components/PageDefault';
import categoriasRepository from '../../repositories/categorias';

function Home() {
  const [initialValues, setinitialValues] = useState([]);

  useEffect(() => {
    categoriasRepository.getAllWithVideos()
      .then((categoriasComVideos) => {
        setinitialValues(categoriasComVideos);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <PageDefault paddingAll={0}>
      {initialValues.length === 0 && (<div>Loading...</div>)}

      {initialValues.map((categoria, indice) => {
        if (indice === 0) {
          return (
            <div key={categoria.id}>
              <BannerMain
                videoTitle={initialValues[0].videos[0].titulo}
                url={initialValues[0].videos[0].url}
                videoDescription="Em entrevista exclusiva ao Le Monde Diplomatique Brasil, o rapper e compositor dos Racionais MCs, Mano Brown, analisa carreira e as transformações sociais e culturais do Brasil nos últimos trinta anos."
              />
              <Carousel
                ignoreFirstVideo
                category={initialValues[0]}
              />
            </div>
          );
        }

        return (
          <Carousel
            key={categoria.id}
            category={categoria}
          />
        );
      })}
    </PageDefault>
  );
}

export default Home;
