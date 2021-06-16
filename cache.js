/**
 *  Caso exista uma api vamos cachear a busca de resultados.
 */

const api = {
    endpoint: "https://your-api.com",
    params: "",
    options: {},
    header: new Headers(),
    get: async (params = {}) => {
        const url = new URL(api.endpoint);
        url.search = new URLSearchParams(params);
        return new Promise((resolve, reject) => {
            fetch(url)
                .then(res => res.json())
                .then(json => resolve(json))
                .catch(error => reject(error));
        });
    },
    put: async (id, body) => {
        return new Promise((resolve, reject) => {
            resolve({});
            reject({});
        });
    },
    delete: async (id) => {
        return new Promise((resolve, reject) => {
            resolve({});
            reject({});
        });
    },
    update: async (id, body) => {
        return new Promise((resolve, reject) => {
            resolve({});
            reject({});
        });
    },
    cache: {
        buscaStr: new Set(),
        buscaSet: new Set(),
        resultados: [],
        activeList: [],
        busca : async function busca(nome) {
            if (nome.length >= 3) { //
                //Se a string de busca já não existir,busque
                if (!buscasStr.has(nome)) {
                    buscasStr.add(nome);
                    api.get({ nome: nome })
                    .then(resultados => {
                        for (let i = 0; i < resultados.length; i++) {
                            //Se o resultado já não existe, evitar duplicatas
                            let ObjLiteral = JSON.stringify(resultados[i]);
                            if (!buscasSet.has(ObjLiteral)) {
                                buscasSet.add(ObjLiteral);
                                cache.resultados.push(resultados[i]);
                            }
                        }
                        cache.activeList = resultados;
                    });
                };

                return new Promise((resolve) => {
                    resolve(api.cache);
                });
            }
        }
    }
};








