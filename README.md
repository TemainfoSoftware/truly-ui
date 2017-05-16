
```bash
$ git clone https://maiconw@bitbucket.org/TemaInformatica/temainfo-coresystem-angular.git
```

## Comandos

Depois de ter clonado o projeto você pode realizar alterações nos modulos existentes e logo apos utilizar os seguintes comandos:

###bootstrap
```bash
$ lerna bootstrap
```
Inicializa os pacotes do projeto. Instala todas as suas dependencias e liga quaisquer dependencias cruzadas.

###publish
```bash
$ lerna publish
```
Publica uma nova versão dos pacotes que foram alterados para o NPM, porem para realizar este comando você deve estar logado e com permissão ao pacote no NPM atraves do comando `npm login`

**Nota:** Utilize o comando `lerna publish -- --access=public` ou `lerna publish -- --access publish
` para enviar pacote publico ao NPM

##Ajuda
Visite o repositorio do [Lerna](https://github.com/lerna/lerna) para mais detalhe destes comandos.

