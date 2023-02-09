import { Layout } from "@lifesg/react-design-system/layout";
import styled from "styled-components";

export const FormSection = styled(Layout.Content)`
  [data-id="container"] {
    flex-direction: column;
  }
`;

export const CustomContainer = styled(Layout.Container)`
  flex-direction: column;
  margin-top: 2rem;
  margin-bottom: 2rem;
`;
