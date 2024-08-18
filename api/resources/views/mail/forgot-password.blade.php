<x-mail::message>
# Olá, {{ $userName }}

Você solicitou uma redefinição de senha a partir da sessão "esqueci minha senha". Clique no botão abaixo para criar
uma nova senha.

<x-mail::button :url="$resetLink">
    Clique aqui para redefinir
</x-mail::button>

<x-mail::panel>
    <p>Se você não solicitou esse email, por favor, considere entrar em contato com nosso <a href="#">suporte</a>.</p>
    <p>Esse link só será válido por <b>1 (uma) hora</b>.</p>
</x-mail::panel>

<br>
{{ config('app.name') }}
</x-mail::message>
