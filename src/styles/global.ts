import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    
    :root{
        --primary: #3F4BFF;
        --secondary: #333333;
        --green: #26CC78;
        --gray: #C4C4C4;
        --gray-700: #9C9C9C;
        --base: #757575;
        --orange: #FF9C00;
        --purple: #4A6BDF;
        --red: #E24747;
        --background: #ffffff;
        --white: #ffffff;
    }
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        outline: none;
    }
    html{
        @media (max-width: 1080px){
            font-size: 93.75%;
        }
        @media (max-width: 720px){
            font-size: 87.5%;
        }
        scroll-behavior: smooth;
    }
    body{
        background: var(--background);
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
    ::selection{
        color: #fff;
        background: #1f1f1f;
    }
    body, input, textarea, button, select{
        font-family: 'Inter', sans-serif;
        font-weight: 400;
        color: var(--secondary);
    }
    h1, h2, h3, h4, h5, h6, strong {
        font-weight: 700;
    }
    p{
        font-size: 1rem;
        line-height: 1.5rem;
        font-weight:300;
        color: var(--base);
    }
    
    a {
      text-decoration: none;
    }
    button{
        cursor: pointer;
    }
    
    [disabled],
    .disabled{
        opacity: 0.8;
        cursor: not-allowed;
    }
    .react-modal-overlay{
        background: rgba(0, 0, 0, 0.5);
        position: fixed;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items:center;
    }
    .react-modal-content{
        width: 100%;
        max-width: 680px;
        background: var(--white);
        padding: 3rem;
        position: relative;
        border-radius: 0.25rem;
    }
    .react-modal-close{
        position: absolute;
        right: 1.5rem;
        top: 1.5rem;
        border: 0;
        background: transparent;
        transition: .3s;
        &:hover{
            filter: brightness(0.8)
        }
    }
    .lds-ellipsis {
      display: inline-block;
      position: relative;
      width: 80px;
      height: 80px;
    }
    .lds-ellipsis div {
      position: absolute;
      top: 33px;
      width: 13px;
      height: 13px;
      border-radius: 50%;
      background: var(--primary);
      animation-timing-function: cubic-bezier(0, 1, 1, 0);
    }
    .lds-ellipsis div:nth-child(1) {
      left: 8px;
      animation: lds-ellipsis1 0.6s infinite;
    }
    .lds-ellipsis div:nth-child(2) {
      left: 8px;
      animation: lds-ellipsis2 0.6s infinite;
    }
    .lds-ellipsis div:nth-child(3) {
      left: 32px;
      animation: lds-ellipsis2 0.6s infinite;
    }
    .lds-ellipsis div:nth-child(4) {
      left: 56px;
      animation: lds-ellipsis3 0.6s infinite;
    }
    @keyframes lds-ellipsis1 {
      0% {
        transform: scale(0);
      }
      100% {
        transform: scale(1);
      }
    }
    @keyframes lds-ellipsis3 {
      0% {
        transform: scale(1);
      }
      100% {
        transform: scale(0);
      }
    }
    @keyframes lds-ellipsis2 {
      0% {
        transform: translate(0, 0);
      }
      100% {
        transform: translate(24px, 0);
      }
    }
    .whatsapp{
      padding: 1rem 2rem;
      background: #25D366;
      color: white;
      border: 0;
      border-radius: 0.3rem;
      margin-top: 1rem;
    }
    .tooltip {
  position: relative;
  display: inline-block;
}
.tooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: #555;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  margin-left: -60px;
  opacity: 0;
  transition: opacity 0.3s;
}
.tooltip .tooltiptext::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #555 transparent transparent transparent;
}
.tooltip:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
}
`;